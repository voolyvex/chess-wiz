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
        # Many-to-many fields should not be required at registration time.
        fields = (
            'username',
            'password',
            'email',
            'first_name',
            'last_name',
            'is_student',
            'is_coach',
        )

    def create(self, validated_data):
        # Use Django's user creation helper so password hashing is correct.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        # Optional flags; default False if not provided.
        user.is_student = validated_data.get('is_student', False)
        user.is_coach = validated_data.get('is_coach', False)
        user.save()
        return user


# serializer for junction tables
class UserPgnSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = User
        fields = ('my_games', 'assigned', 'is_student', 'username', 'first_name', 'last_name', 'pgn_favorites')

    