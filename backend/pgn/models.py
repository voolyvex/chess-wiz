from django.db import models


class Pgn(models.Model):

    id = models.BigAutoField(verbose_name='pgn id', primary_key=True)
    pgn = models.TextField(verbose_name='pgn file')
    