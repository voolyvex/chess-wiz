from .models import Pgn
from .serializers import PgnSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes


class PgnList(APIView):
    
    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = Pgn.objects.all()
        serializer = PgnSerializer(pgns, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = PgnSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

