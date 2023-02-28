from django.core.validators import MinLengthValidator
from authentication.models import User
from django.db import models
from pgn.models import Pgn
from fen.models import Fen
from django.utils import timezone


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=255, validators=[MinLengthValidator(1)], blank=False)
    date_created = models.DateTimeField(default=timezone.now)
    game_id = models.CharField(max_length=128, null=True, blank=True, default=None)
    pgn_id = models.ForeignKey(Pgn, on_delete=models.CASCADE, null=True, blank=True, default=None)
    fen_id = models.ForeignKey(Fen, on_delete=models.CASCADE, null=True, blank=True, default=None)