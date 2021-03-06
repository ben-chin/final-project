"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
import views

from django.conf.urls import url, include


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^me/$', views.profile, name='profile'),
    url(r'^me/analyse/$', views.analyse, name='analyse'),
    url(r'^me/report/$', views.report, name='report'),
    url(r'^tweets/$', views.tweets, name='tweets'),
    url(r'^tweets/(?P<tweet_id>[0-9]+)/delete/$', views.delete_tweet, name='delete_tweet'),
    url(r'^analysis/save$', views.save_analysis, name='save_analysis'),


    # Social auth urls
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^logout/', views.logout, name='logout'),

]
