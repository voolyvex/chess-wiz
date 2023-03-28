from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # for any additional fields you'd like to add to the JWT sent back in response
        # add below using token["field name"] = user.name_of_property

        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["is_student"] = user.is_student
        token["is_coach"] = user.is_coach

        return token


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        # If added new columns through the User model, add them in the fields
        # list as seen below
        fields = ('username', 'password', 'email',
                  'first_name', 'last_name', 'is_student', 'is_coach', 'my_games', 'assigned', 'pgn_favorites')

    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_student=validated_data['is_student'],
            is_coach=validated_data['is_coach'],
            my_games=validated_data['my_games'],
            assigned=validated_data['assigned'],
            pgn_favorites=validated_data['pgn_favorites']

            # If added new columns through the User model, add them in this
            # create method. Example below:

            # is_student=validated_data['is_student']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


# serializer for junction tables
class UserPgnSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = User
        fields = ('my_games', 'assigned', 'is_student', 'username', 'first_name', 'last_name', 'pgn_favorites')

    