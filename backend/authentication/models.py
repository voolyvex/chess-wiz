from django.db import models
from django.contrib.auth.models import AbstractUser
from pgn.models import Pgn



class User(AbstractUser):
    is_student = models.BooleanField('student status', default=False)
    is_coach = models.BooleanField('coach status', default=False)

    my_games = models.ManyToManyField(Pgn, related_name='user_mygames')
    assigned = models.ManyToManyField(Pgn, related_name='user_assigned')
    pgn_favorites = models.ManyToManyField(Pgn, through='PgnFavorites', related_name='favorite_users')
 
class PgnFavorites(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pgn = models.ForeignKey(Pgn, on_delete=models.CASCADE)
    is_favorite = models.BooleanField(default=False)

    