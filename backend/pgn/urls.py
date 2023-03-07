from django.urls import path
from . import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    # path('pgn/train/', views.user_assigned_pgn),
    # path('pgn/faves', views.user_favorite_pgn),
    path('', views.PgnList.as_view()),
    path('mygames/', views.FetchMyGames.as_view()),
    path('mygames/<int:pgn_pk>/', views.AddPgnToMyGames.as_view())
    

]