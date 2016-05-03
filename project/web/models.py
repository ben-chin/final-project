from django.db import models

from web.fields import ListField
from django.contrib.auth.models import User
# from social.apps.django_app.default.models import UserSocialAuth


class Category(models.Model):
    name = models.CharField(max_length=100)
    content = models.CharField(max_length=300)

    def __unicode__(self):
        return self.name


class Analysis(models.Model):
    user = models.ForeignKey(User)

    def __unicode__(self):
        return '{}\'s analysis'.format(self.user.id)


class CategoryAnalysis(models.Model):
    analysis = models.ForeignKey(Analysis, related_name='categories')
    category = models.OneToOneField(Category)
    posts = ListField()

    def __unicode__(self):
        return '{}\'s {} analysis'.format(self.analysis.user.id, self.category)
