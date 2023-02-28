from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'date_created', 'game_id', 'pgn_id', 'fen_id' ]
        depth = 1
        