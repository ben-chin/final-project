from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.models import User
from social.apps.django_app.default.models import UserSocialAuth

from api.fields import CustomListField
from web.models import Category, CategoryAnalysis, Analysis, UserProfile


class UserSocialAuthSerializer(ModelSerializer):
    screen_name = CharField(source='extra_data.access_token.screen_name')

    class Meta:
        model = UserSocialAuth
        fields = ('uid', 'provider', 'screen_name')


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_img', 'posts', 'followers', 'following', 'last_analysed')


class UserSerializer(ModelSerializer):
    social_auth = UserSocialAuthSerializer(many=True)
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'social_auth', 'profile')


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class CategoryAnalysisSerializer(ModelSerializer):
    category = CategorySerializer()
    posts = CustomListField()

    class Meta:
        model = CategoryAnalysis
        fields = ('category', 'posts')


class AnalysisSerializer(ModelSerializer):
    user = UserSerializer()
    categories = CategoryAnalysisSerializer(many=True, read_only=True)

    class Meta:
        model = Analysis
        fields = ('user', 'categories')
