from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, UserPgnSerializer
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.decorators import permission_classes
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer


class FetchStudents(APIView):

    @permission_classes([AllowAny])
    def get(self, request):
        users = User.objects.all()
        serializer = UserPgnSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
