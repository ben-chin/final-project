import time
import os
import json

# from collections import defaultdict
from django.shortcuts import render, redirect, get_object_or_404
from django.core.urlresolvers import reverse
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from social.apps.django_app.default.models import UserSocialAuth
# from django.core.cache import cache
from web.models import Analysis, CategoryAnalysis, Category
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from celery import Celery

# TODO: refactor this to somewhere else
import tweepy
from project.settings import SOCIAL_AUTH_TWITTER_KEY, SOCIAL_AUTH_TWITTER_SECRET

celery = Celery(
    'worker',
    broker=os.environ['CELERY_BROKER_URL'],
    backend='rpc'
)


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


def delete_tweet_by_id(tweet_id, user_id):
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

    try:
        return twt.destroy_status(tweet_id)
    except tweepy.TweepError:
        return None


def index(request):
    return render(request, 'web/index/main.html')


@login_required(login_url='/')
def profile(request):
    return render(request, 'web/profile/main.html')


@login_required(login_url='/')
def analyse(request):
    if request.user:
        social_auth = UserSocialAuth.objects.filter(user=request.user)[0]
        celery.send_task('analyse', [
            request.user.id,
            social_auth.uid,
            request.build_absolute_uri(reverse('save_analysis')),
            {
                'key': social_auth.access_token['oauth_token'],
                'secret': social_auth.access_token['oauth_token_secret'],
            },
        ])
        # tweets = cache.get(uid)
        # if tweets is None:
        #     tweets = get_tweets(uid)
        #     cache.set(uid, tweets, 60 * 60 * 24)

        # classify_tweets(tweets, request.user)

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
        uid = request.user.social_auth.get().uid
        tweets = get_tweets_by_ids(ids, uid)
        return JsonResponse({'tweets': tweets})


def delete_tweet(request, tweet_id):
    if request.user:
        uid = request.user.social_auth.get().uid
        status = delete_tweet_by_id(tweet_id, uid)
        if status:
            return JsonResponse({'success': True})
        return JsonResponse({'success': False})


@csrf_exempt
@require_POST
def save_analysis(request):
    post_vars = json.loads(request.POST.get('response'))

    user_id = post_vars['user']
    categories = post_vars['categories']

    user = get_object_or_404(User, pk=user_id)
    analysis = Analysis.objects.create(user=user)

    for c in categories:
        cat_id = c['id'] + 1
        category = get_object_or_404(Category, pk=cat_id)
        posts = c['posts']
        CategoryAnalysis.objects.create(
            analysis=analysis,
            category=category,
            posts=posts
        )

    return redirect('report')
