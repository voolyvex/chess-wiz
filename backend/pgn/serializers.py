from rest_framework import serializers
from .models import Pgn

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class PgnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pgn
        fields = ['id', 'pgn']
        depth = 1
        