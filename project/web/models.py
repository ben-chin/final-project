from django.db import models

from web.fields import ListField
from django.contrib.auth.models import User
# from social.apps.django_app.default.models import UserSocialAuth


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile')
    profile_img = models.URLField()
    posts = models.IntegerField()
    followers = models.IntegerField()
    following = models.IntegerField()
    last_analysed = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '{}\'s profile'.format(self.user.id)


class Category(models.Model):
    name = models.CharField(max_length=100)
    content = models.CharField(max_length=300)

    def __unicode__(self):
        return self.name


class Analysis(models.Model):
    user = models.ForeignKey(User, related_name='owner')
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '{} | {}'.format(self.user.id, self.id)


class CategoryAnalysis(models.Model):
    analysis = models.ForeignKey(Analysis, related_name='categories')
    category = models.ForeignKey(Category)
    posts = ListField()

    def __unicode__(self):
        return '{} | {} - {}'.format(self.analysis.user.id, self.analysis.id, self.category)
