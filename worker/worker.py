import os
import tweepy
import json
import requests
import pusher

from collections import defaultdict
from celery import Celery
from social.twitter import TwitterApiFactory
from autocat import ACSerializer


TWEETS_TO_SCRAPE = 100

# TODO: refactor to use command-line args and specify from ansible/supervisor?
WORKER_DIR = os.path.dirname(os.path.abspath(__file__))
PATH_TO_AC_PKL = os.path.join(WORKER_DIR, 'data', 'ac', 'active', 'ac.pkl')
print '> [worker] loading classifier'
autocat = ACSerializer.load(PATH_TO_AC_PKL)
print '> [worker] loaded classifier'
print '> [worker] ---------------------------------'

celery = Celery(
    'worker',
    broker=os.environ['CELERY_BROKER_URL'],
    backend='rpc'
)

pusher_client = pusher.Pusher(
    app_id='208050',
    key='24f40a1d963e3f8c8ca1',
    secret=os.environ['PUSHER_SECRET'],
    cluster='eu',
    ssl=True
)

twt_factory = TwitterApiFactory(
    consumer_key=os.environ['TWITTER_KEY'],
    consumer_secret=os.environ['TWITTER_SECRET']
)


def scrape_tweets(user_id, creds):
    twt = twt_factory.create(
        access_token_key=creds['key'],
        access_token_secret=creds['secret']
    )

    statuses = []
    cursor = tweepy.Cursor(
        twt.user_timeline,
        user_id=user_id,
        count=200
    )

    for status in cursor.items(TWEETS_TO_SCRAPE):
        statuses.append(status)

    return statuses


def classify_tweets(tweets):
    categories = defaultdict(list)
    for tweet in tweets:
        result = autocat.classify(tweet.text)
        identified_categories = result.nonzero()[1]
        for c in identified_categories:
            categories[c].append(tweet.id_str)

    return categories


# Supply user and credentials to scrape and analyse
# or supply just user and tweets (from cache) to analyse
@celery.task(name='analyse')
def analyse(user_id, social_id, url, credentials=None, tweets=None):
    print '> [worker] scraping tweets'
    tweets = scrape_tweets(social_id, credentials)
    pusher_client.trigger('test_channel', 'my_event', {'isDone': 'scraping'})

    print '> [worker] classifying tweets'
    result = classify_tweets(tweets)
    pusher_client.trigger('test_channel', 'my_event', {'isDone': 'analysis'})

    print '> [worker] done'

    categories = []
    for cat_id in result:
        categories.append({
            'id': cat_id,
            'posts': result[cat_id],
        })

    data = {
        'user': user_id,
        'categories': categories,
    }

    payload = {'response': json.dumps(data)}
    requests.post(url, payload)
