from authentication.models import User
from pgn.models import Pgn

def build_favorited_dict():
            
            for pgn in Pgn.objects.all():
            
            # Build a dictionary mapping each User object to a boolean value representing
            # whether the Pgn is a favorite for that User.
            
                pgn.favorited_dict = {user: user.pgnfavorites_set.filter(user=user, is_favorite=True).exists()
                                for user in User.objects.all()}
            pgn.save()


