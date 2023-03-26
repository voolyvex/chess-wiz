from rest_framework import serializers
from .models import Pgn


class PgnSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pgn
        fields = '__all__'
        depth = 1


