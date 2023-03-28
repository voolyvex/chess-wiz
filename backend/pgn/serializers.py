from rest_framework import serializers
from .models import Pgn
from authentication.models import PgnFavorites
from authentication.serializers import UserPgnSerializer


class PgnSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pgn
        fields = ('id', 'pgn', 'favorited_dict', 'favorite_users')
        depth = 1


class PgnFavoriteSerializer(serializers.ModelSerializer):
    pgn = PgnSerializer()
    user = UserPgnSerializer()
    

    class Meta:
        model = PgnFavorites
        fields = ('id', 'pgn', 'user', 'is_favorite')
        depth = 1