from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.response import Response
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from web.models import Category, Analysis
from api.serializers import CategorySerializer, UserSerializer, AnalysisSerializer


class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        raise Http404

    def retrieve(self, request, pk=None):
        user = get_object_or_404(self.queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AnalysisViewSet(ReadOnlyModelViewSet):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer
