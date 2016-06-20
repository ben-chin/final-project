from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from web.models import Category, Analysis
from api.serializers import CategorySerializer, UserSerializer, \
    AnalysisSerializer


class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AnalysisViewSet(ReadOnlyModelViewSet):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        user_analysis = Analysis.objects.filter(user=request.user).order_by('-created_at')
        if not user_analysis:
            return Response({})
        user_analysis = user_analysis[0]
        serializer = AnalysisSerializer(user_analysis)
        return Response(serializer.data)
