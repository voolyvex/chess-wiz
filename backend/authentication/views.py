from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

# Related Manager for MyGames
# class AddPgnToMyGames(APIView):

#     @permission_classes([IsAuthenticated])
#     def patch(self, request, user_pk, pgn_pk):
#         try:
#             user = User.objects.get(id=user_pk)
#             pgn = Pgn.objects.get(id=pgn_pk)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         user.my_games.add(pgn)
#         user.save()
#         serializer = UserPgnSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
