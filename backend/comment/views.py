from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import CommentSerializer
from .models import Comment
from pgn.models import Pgn
from fen.models import Fen
from django.shortcuts import get_object_or_404

# GET #
class CommentList(APIView):
    @permission_classes([IsAuthenticated])
    def get_by_pgn(self, request):
        comments = get_object_or_404(Comment, pgn_id=Pgn.id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @permission_classes([IsAuthenticated])
    def get_by_fen(self, request):
        fen_id_param = request.query_params.get('fen_id')
        comments = Comment.objects.all().filter(fen_id__id=Fen.id)
        serializer = CommentSerializer(comments, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def get_by_game(self, request):
        game_id_param = request.query_params.get('game_id')
        comments = Comment.objects.all().filter(game_id=game_id_param)
        serializer = CommentSerializer(comments, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# POST #
class CommentPost(APIView):
    @permission_classes([IsAuthenticated])
    def post(self, request, format=None):
        print('User ', f"{request.user.id} {request.user.email} {request.user.username} {request.user.is_student} {request.user.is_coach}")
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
