import os
import tweepy
import json

from collections import defaultdict
from celery import Celery
from social.twitter import TwitterApiFactory
from autocat import ACSerializer

# TODO: refactor to use command-line args and specify from ansible/supervisor?
WORKER_DIR = os.path.dirname(os.path.abspath(__file__))
PATH_TO_AC_PKL = os.path.join(WORKER_DIR, 'data', 'ac', 'categorizer.pkl')
autocat = ACSerializer.load(PATH_TO_AC_PKL)

celery = Celery(
    'worker',
    broker=os.environ['CELERY_BROKER_URL'],
    backend='rpc'
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

    for status in cursor.items(3):
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
def analyse(user_id, social_id, credentials=None, tweets=None):
    # TODO: send notification
    print '> [worker] scraping tweets'
    tweets = scrape_tweets(social_id, credentials)
    # TODO: send notification
    print '> [worker] classifying tweets'
    result = classify_tweets(tweets)
    categories = []
    for cat_id in result:
        categories.append({
            'id': cat_id,
            'posts': result[cat_id],
        })

    # TODO: send POST request with result to web app
    payload = {
        'user': user_id,
        'categories': categories,
    }
    print json.dumps(payload)
