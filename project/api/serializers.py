from web.models import Category
from rest_framework.serializers import HyperlinkedModelSerializer


class CategorySerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')
