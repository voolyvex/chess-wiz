from django.db import models


class Pgn(models.Model):

    id = models.BigAutoField(verbose_name='pgn id', primary_key=True)
    pgn = models.TextField(verbose_name='pgn file')
    title = models.CharField(max_length=128)
    desc = models.CharField(verbose_name='description', max_length=255)