from .models import Pgn
from .serializers import PgnSerializer, PgnFavoriteSerializer
from authentication.serializers import UserPgnSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.http import Http404
from authentication.models import User, PgnFavorites
import re
from datetime import datetime
import logging

logging.basicConfig(filename='example.log',
                    encoding='utf-8', level=logging.DEBUG)


def parse_date(date_str):
    date = datetime.strptime(date_str, '%a %b %d %Y %H:%M:%S GMT%z (%Z)')
    return date.strftime('%b %d %Y')


def parse_pgn(pgn_text):
    game_data = {}
    # extract the game information from the PGN text
    pgn_header_regex = re.compile(r"\[(\w+)\s+\"(.+?)\"]")
    pgn_headers = pgn_header_regex.findall(pgn_text)

    # check if there are any headers
    if pgn_headers:
        for header in pgn_headers:
            if header[0] == "White":
                game_data["white"] = header[1]
            elif header[0] == "Black":
                game_data["black"] = header[1]
            elif header[0] == "WhiteElo":
                game_data["white_elo"] = header[1]
            elif header[0] == "BlackElo":
                game_data["black_elo"] = header[1]
            elif header[0] == "Date":
                try:
                    date_str = header[1]

                    game_data["date"] = parse_date(date_str)
                except ValueError:
                    game_data["date"] = header[1]

    # extract the ECO code
    eco_regex = re.compile(r"\[ECO\s+\"(.+?)\"]")
    eco_match = eco_regex.search(pgn_text)
    if eco_match:
        game_data["eco"] = eco_match.group(1)

    # Extract the moves
    moves_regex = re.compile(r"\]\s*([^\]]+)\s*$")
    moves_match = moves_regex.search(pgn_text)
    if moves_match:
        moves = moves_match.group(1)
        game_data["moves"] = moves.strip()

    return game_data



class FetchMyGames(APIView):
    # Get all mygames of a user

    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = []
        user = User.objects.get(id=request.user.id)
        user_serializer = UserPgnSerializer(user)

        for pgn in user_serializer.data['my_games']:
            real_pgn = Pgn.objects.get(id=pgn)

            # extract game data from PGN
            game_data = parse_pgn(real_pgn.pgn)

            # serialize response data
            pgn_serializer = PgnSerializer(real_pgn)
            pgns.append({
                **pgn_serializer.data,
                'white_name': game_data.get("white"),
                'white_rating': game_data.get("white_elo"),
                'black_name': game_data.get("black"),
                'black_rating': game_data.get("black_elo"),
                'date': game_data.get("date"),
                'eco': game_data.get("eco"),
                'moves': game_data.get("moves"),
            })

        return Response(pgns, status=status.HTTP_200_OK)


class FetchAssigned(APIView):
    # Get all assigned games of a user

    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = []
        user = User.objects.get(id=request.user.id)
        user_serializer = UserPgnSerializer(user)

        for pgn in user_serializer.data['assigned']:
            real_pgn = Pgn.objects.get(id=pgn)

            # extract game data from PGN
            game_data = parse_pgn(real_pgn.pgn)

            # serialize response data
            pgn_serializer = PgnSerializer(real_pgn)
            pgns.append({
                **pgn_serializer.data,
                'white_name': game_data.get("white"),
                'white_rating': game_data.get("white_elo"),
                'black_name': game_data.get("black"),
                'black_rating': game_data.get("black_elo"),
                'date': game_data.get("date"),
                'eco': game_data.get("eco"),
                'moves': game_data.get("moves"),
            })

        return Response(pgns, status=status.HTTP_200_OK)


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


class FetchFavorites(APIView):
    # Get all favorites of a user

    @permission_classes([IsAuthenticated])
    def get(self, request):
        pgns = []
        user = User.objects.get(id=request.user.id)
        user_serializer = UserPgnSerializer(user)

        for pgn in user_serializer.data['pgn_favorites']:
            real_pgn = Pgn.objects.get(id=pgn)
            try:
                pgn_favorite = PgnFavorites.objects.get(user=user, pgn=real_pgn)
            except PgnFavorites.DoesNotExist:
                continue  # skip this Pgn object if it is not a favorite
            if not pgn_favorite.is_favorite:
                continue  # skip this Pgn object if it is a favorite, but not marked as such
            

            # extract game data from PGN
            game_data = parse_pgn(real_pgn.pgn)

            # serialize response data
            pgn_serializer = PgnSerializer(real_pgn)
            pgns.append({
                **pgn_serializer.data,
                'white_name': game_data.get("white"),
                'white_rating': game_data.get("white_elo"),
                'black_name': game_data.get("black"),
                'black_rating': game_data.get("black_elo"),
                'date': game_data.get("date"),
                'eco': game_data.get("eco"),
                'moves': game_data.get("moves"),
            })

        return Response(pgns, status=status.HTTP_200_OK)



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


class RemoveOrAddFavorite(APIView):

    # def flipBool(self, pgn, user):

    #     # Toggles the favorite status of a Pgn for a specific user.
    #     try:
    #         PgnFavorites.is_favorite = not PgnFavorites.is_favorite
    #         user.save()
    #     except PgnFavorites.DoesNotExist:
    #                 # If a PgnFavorite object for the user doesn't exist,
    #                 # create one and set is_favorite to True
    #                 PgnFavorites.objects.create(
    #                     pgn=pgn, user=user, is_favorite=True)

    #     # Update the favorited_dict field on the Pgn model to reflect the current
    #     # favorite status for all users.
    #     favorited_users = PgnFavorites.objects.filter(
    #         pgn=pgn, is_favorite=True).values_list('user__username', flat=True)
    #     pgn.favorited_dict = {'users': list(favorited_users)}
    #     pgn.save()

    @permission_classes([IsAuthenticated])
    def patch(self, request, pgn_pk):
        try:
            user = User.objects.get(id=request.user.id)
            pgn = Pgn.objects.get(id=pgn_pk)
            pf = PgnFavorites.objects.filter(pgn=pgn, user=user).first()

            if pf:
                # if this game is already in pgn_favorites
                # flip boolean
                pf.is_favorite = not pf.is_favorite

            else:
                # create reference to the pgn in pgn_favorites
                pf = PgnFavorites.objects.create(
                    pgn=pgn, user=user, is_favorite=True)

        except Pgn.DoesNotExist:
            raise Http404("Pgn does not exist")

        # pgn.save()
        # pgn_serialized = PgnSerializer(pgn).data
        pf.save()
        pf_serialized = PgnFavoriteSerializer(pf).data
        response_data = {
            "pgn_favorite": pf_serialized,
            # "pgn": pgn_serialized
        }
        return Response(response_data, status=status.HTTP_200_OK)


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


class FetchPGNbyId(APIView):
    # GET Pgn by Id
    @permission_classes([IsAuthenticated])
    def get(self, request, pgn_pk):
        pgn = Pgn.objects.get(id=pgn_pk)
        try:
            is_favorite = PgnFavorites.objects.get(
                user=request.user, pgn=pgn).is_favorite
        except PgnFavorites.DoesNotExist:
            is_favorite = False
        serializer = PgnSerializer(pgn)
        data = serializer.data
        data['is_favorite'] = is_favorite
        return Response(data, status=status.HTTP_200_OK)
