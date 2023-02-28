from django.db import models


class Fen(models.Model):

    id = models.BigAutoField(verbose_name='fen id', primary_key=True)
    fen = models.TextField(verbose_name='fen file')
  