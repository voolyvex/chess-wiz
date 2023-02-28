from django.urls import path
from fen import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    # path('pgn/train/', views.user_assigned_pgn),
    # path('pgn/faves', views.user_favorite_pgn),
    path('', views.FenList.as_view()),
    

]