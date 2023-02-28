from rest_framework import serializers
from .models import Fen

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class FenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fen
        fields = ['id', 'fen']
        