from django.db import models



class Pgn(models.Model):

    id = models.BigAutoField(verbose_name='pgn id', primary_key=True)
    pgn = models.TextField(verbose_name='pgn file')
    is_favorite = models.BooleanField(
        verbose_name='is favorite', default=False)

    favorited_dict = models.JSONField(default=dict, blank=True)

    