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


class CommentList(APIView):
    @permission_classes([IsAuthenticated])
    def get(self, request):  # Get all comments
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
class CommentDetailPgn(APIView):
    @permission_classes([IsAuthenticated])
    def get(self, request, pgn_id):  # Get comments by pgn_id
        comments = get_object_or_404(Comment, pgn_id__id=pgn_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CommentDetailFen(APIView):
    @permission_classes([IsAuthenticated])
    def get(self, request, fen_id):  # Get comments by fen_id
        # fen_id_param = request.query_params.get('fen_id')
        comments = get_object_or_404(Comment, fen_id__id=fen_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CommentDetailGame(APIView):
    @permission_classes([IsAuthenticated])
    def get(self, request):  # Get comments by game_id (3rd Party API)
        if 'game_id' in self.request.GET:
            game_id_param = self.request.query_params.get('game_id')
            comments = Comment.objects.filter(game_id = game_id_param)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_418_IM_A_TEAPOT)


class CommentPost(APIView):
    @permission_classes([IsAuthenticated])
    def post(self, request, format=None):
        print(
            'User ', f"{request.user.id} {request.user.email} {request.user.username} {request.user.is_student} {request.user.is_coach}")
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
