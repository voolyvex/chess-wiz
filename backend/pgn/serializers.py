from rest_framework import serializers
from .models import Pgn
from authentication.models import User

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class PgnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pgn
        fields = ['id', 'pgn']
        depth = 1
        
