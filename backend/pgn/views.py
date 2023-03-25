from .models import Pgn
from .serializers import PgnSerializer
from authentication.serializers import UserPgnSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.http import Http404
from authentication.models import User, PgnFavorites


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


class FetchMyGames(APIView):
    # Get all mygames of a user

    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = []
        user = User.objects.get(id=request.user.id)
        user_serializer = UserPgnSerializer(user)

        for pgn in user_serializer.data['my_games']:
            real_PGN = Pgn.objects.get(id=pgn)
            pgn_serializer = PgnSerializer(real_PGN)
            pgns.append(pgn_serializer.data)

        return Response(pgns, status=status.HTTP_200_OK)


class FetchFavorites(APIView):
    # Get all favorites of a user

    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = []
        user = User.objects.get(id=request.user.id)
        user_serializer = UserPgnSerializer(user)

        for pgn in user_serializer.data['favorited']:
            real_PGN = Pgn.objects.get(id=pgn)
            pgn_serializer = PgnSerializer(real_PGN)
            pgns.append(pgn_serializer.data)

        return Response(pgns, status=status.HTTP_200_OK)


class FetchAssigned(APIView):
    # Get all assigned games of a user

    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = []
        user = User.objects.get(id=request.user.id)
        user_serializer = UserPgnSerializer(user)

        for pgn in user_serializer.data['assigned']:
            real_PGN = Pgn.objects.get(id=pgn)
            pgn_serializer = PgnSerializer(real_PGN)
            pgns.append(pgn_serializer.data)

        return Response(pgns, status=status.HTTP_200_OK)


class AddPgnToMyGames(APIView):
    # Record in junction table for MyGames

    @permission_classes([IsAuthenticated])
    def patch(self, request, pgn_pk):
        try:
            user = User.objects.get(id=request.user.id)
            pgn = Pgn.objects.get(id=pgn_pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.my_games.add(pgn)
        user.save()
        serializer = UserPgnSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# class AddPgnToFavorites(APIView):
# # Record in junction table for Favorites

#     @permission_classes([IsAuthenticated])
#     def patch(self, request, pgn_pk):
#         try:
#             user = User.objects.get(id=request.user.id)
#             pgn = Pgn.objects.get(id=pgn_pk)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         user.favorites.add(pgn)
#         user.save()
#         serializer = UserPgnSerializer(user, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)

class RemoveOrAddFavorite(APIView):

    def flipBool(self, pgn, user):
    
        # Toggles the favorite status of a Pgn for a specific user.
        
        try:
            pgn_favorite = PgnFavorites.objects.get(pgn=pgn, user=user)
            pgn_favorite.is_favorite = not pgn_favorite.is_favorite
            pgn_favorite.save()
        except PgnFavorites.DoesNotExist:
            # If a PgnFavorite object for the user doesn't exist,
            # create one and set is_favorite to True
            pgn_favorite = PgnFavorites.objects.create(
                pgn=pgn, user=user, is_favorite=True)

        # Update the favorited_dict field on the Pgn model to reflect the current
        # favorite status for all users.
        favorited_users = PgnFavorites.objects.filter(
            pgn=pgn, is_favorite=True).values_list('user__username', flat=True)
        pgn.favorited_dict = {'users': list(favorited_users)}
        pgn.save()

    @permission_classes([IsAuthenticated])
    def patch(self, request, pgn_pk):
        try:
            user = User.objects.get(id=request.user.id)
            pgn = Pgn.objects.get(id=pgn_pk)
            pf = PgnFavorites.objects.filter(pgn=pgn, user=user).first()
        except Pgn.DoesNotExist:
            raise Http404("Pgn does not exist")
        if pf:
            # remove the pgn from the junction table
            pf.delete()
        else:
            # add the pgn to the junction table
            PgnFavorites.objects.create(pgn=pgn, user=user, is_favorite=True)
        self.flipBool(pgn, user)
        pgn.save()
        pgn_serialized = PgnSerializer(pgn, partial=True).data
        user.save()
        user_serialized = UserPgnSerializer(user).data
        response_data = {
            "user": user_serialized,
            "pgn": pgn_serialized
        }
        return Response(response_data, status=status.HTTP_200_OK)

# class RemoveOrAddFavorite(APIView):

#     def flipBool(self, pgn):
#         pgn.pgnfavorites_set.is_favorite = not pgn.pgnfavorites_set.is_favorite

#     @permission_classes([IsAuthenticated])
#     def patch(self, request, pgn_pk):
#         try:
#             user = User.objects.get(id=request.user.id)
#             pgn = Pgn.objects.get(id=pgn_pk)
#         except Pgn.DoesNotExist:
#             raise Http404("Pgn does not exist")
#         if PgnFavorites.filter(id=pgn_pk).exists():
#             # remove the pgn from the junction table
#             pgn.pgnfavorites.remove(pgn)
#         else:
#             # add the pgn to the junction table
#             PgnFavorites.add(pgn)
#         self.flipBool(pgn)
#         pgn.save()
#         pgn_serialized = PgnSerializer(pgn, partial=True).data
#         user.save()
#         user_serialized = UserPgnSerializer(user).data
#         response_data = {
#             "user": user_serialized,
#             "pgn": pgn_serialized
#         }
#         return Response(response_data, status=status.HTTP_200_OK)


class CoachAssignPGN(APIView):
    # Record in Assigned junction table for specified student id

    @permission_classes([IsAuthenticated])
    def patch(self, request, pgn_pk, student):
        try:
            user = User.objects.get(username=student)
            pgn = Pgn.objects.get(id=pgn_pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.assigned.add(pgn)
        user.save()
        serializer = UserPgnSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddPgnToAssigned(APIView):
    # Record in junction table for Assigned

    @permission_classes([IsAuthenticated])
    def patch(self, request, pgn_pk):
        try:
            user = User.objects.get(id=request.user.id)
            pgn = Pgn.objects.get(id=pgn_pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.assigned.add(pgn)
        user.save()
        serializer = UserPgnSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# class DeletePgn(APIView):

#     # DELETE Pgn from junction table
#     @permission_classes([IsAuthenticated])
#     def delete(self, pk):
#         game = get_object_or_404(Pgn, pk=pk)
#         game.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class FetchPGNbyId(APIView):
    # GET Pgn by Id
    @permission_classes([IsAuthenticated])
    def get(self, request, pgn_pk):
        pgn = Pgn.objects.get(id=pgn_pk)

        serializer = PgnSerializer(pgn)
        return Response(serializer.data, status=status.HTTP_200_OK)
