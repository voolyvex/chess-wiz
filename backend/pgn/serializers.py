from rest_framework import serializers
from .models import Pgn


# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class PgnSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pgn
        fields = '__all__'
        depth = 1


