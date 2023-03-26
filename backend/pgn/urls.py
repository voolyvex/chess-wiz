from django.urls import path
from . import views


urlpatterns = [

    path('', views.PgnList.as_view()),
    path('<int:pgn_pk>/', views.FetchPGNbyId.as_view()),
    path('assign/<str:student>/<int:pgn_pk>/', views.CoachAssignPGN.as_view()),
    path('favorites/', views.FetchFavorites.as_view()),
    path('favorites/<int:pgn_pk>/', views.RemoveOrAddFavorite.as_view()),
    path('my_games/', views.FetchMyGames.as_view()),
    path('my_games/<int:pgn_pk>/', views.AddPgnToMyGames.as_view()),
    path('assigned/', views.FetchAssigned.as_view()),
    path('assigned/<int:pgn_pk>/', views.AddPgnToAssigned.as_view()),
    
]