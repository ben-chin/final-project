import numpy as np
import time

from collections import defaultdict
from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from social.apps.django_app.default.models import UserSocialAuth
from django.core.cache import cache
from web.models import Analysis, CategoryAnalysis, Category
from django.http import JsonResponse

# TODO: refactor this to somewhere else
import os
from project.settings import BASE_DIR
from autocat import ACSerializer

PATH_TO_AC_PKL = os.path.join(BASE_DIR, 'data', 'ac', 'categorizer.pkl')
print 'loading cat'
# ac = ACSerializer.load(PATH_TO_AC_PKL)
print 'fully loaded cat'

# TODO: refactor this to somewhere else
import tweepy
from project.settings import SOCIAL_AUTH_TWITTER_KEY, SOCIAL_AUTH_TWITTER_SECRET


def get_tweets(user_id):
    social_auth = UserSocialAuth.objects.filter(uid=user_id, provider='twitter')
    if not social_auth:
        return None

    social_auth = social_auth[0]

    auth = tweepy.OAuthHandler(
        SOCIAL_AUTH_TWITTER_KEY,
        SOCIAL_AUTH_TWITTER_SECRET
    )
    auth.set_access_token(
        social_auth.access_token['oauth_token'],
        social_auth.access_token['oauth_token_secret']
    )
    twt = tweepy.API(
        auth_handler=auth,
        wait_on_rate_limit=True,
        wait_on_rate_limit_notify=True,
    )

    statuses = []

    cursor = tweepy.Cursor(
        twt.user_timeline,
        user_id=user_id,
        count=200
    )

    for status in cursor.items(3000):
        statuses.append(status)

    return statuses


def get_tweets_by_ids(ids, user_id):
    social_auth = UserSocialAuth.objects.filter(uid=user_id, provider='twitter')
    if not social_auth:
        return None

    social_auth = social_auth[0]

    auth = tweepy.OAuthHandler(
        SOCIAL_AUTH_TWITTER_KEY,
        SOCIAL_AUTH_TWITTER_SECRET
    )
    auth.set_access_token(
        social_auth.access_token['oauth_token'],
        social_auth.access_token['oauth_token_secret']
    )
    twt = tweepy.API(
        auth_handler=auth,
        wait_on_rate_limit=True,
        wait_on_rate_limit_notify=True,
    )

    return map(parse_tweet, twt.statuses_lookup(id_=ids, trim_user=True))


def parse_tweet(tweet):
    return {
        'id': str(tweet.id),
        'user_id': str(tweet.user.id),
        'created_at': str(time.mktime(tweet.created_at.timetuple())),
        'text': tweet.text.encode('utf8'),
    }


def classify_tweets(tweets, user):
    categories = defaultdict(list)
    for tweet in tweets:
        result = ac.classify(tweet.text)
        identified_categories = np.nonzero(result)[1]
        for c in identified_categories:
            categories[c].append(tweet.id_str)

    analysis = Analysis(user=user)
    analysis.save()

    for category in categories:
        cat = Category.objects.get(pk=category + 1)
        c = CategoryAnalysis(
            category=cat,
            posts=categories[category],
            analysis=analysis
        )
        c.save()


def index(request):
    return render(request, 'web/index/main.html')


@login_required(login_url='/')
def profile(request):
    return render(request, 'web/profile/main.html')


@login_required(login_url='/')
def analyse(request):
    if request.user:
        uid = request.user.social_auth.get().uid
        tweets = cache.get(uid)
        if tweets is None:
            tweets = get_tweets(uid)
            cache.set(uid, tweets, 60 * 60 * 24)

        classify_tweets(tweets, request.user)

        return redirect('report')


@login_required(login_url='/')
def report(request):
    return render(request, 'web/report/main.html', {
        'screen_name': request.user.social_auth.get().access_token['screen_name'],
    })


@login_required(login_url='/')
def logout(request):
    auth_logout(request)
    return redirect('index')


# hack
def tweets(request):
    if request.user:
        ids = request.GET.getlist('ids[]')
        print ids
        uid = request.user.social_auth.get().uid
        tweets = get_tweets_by_ids(ids, uid)
        return JsonResponse({'tweets': tweets})
