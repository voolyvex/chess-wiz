from django.urls import path
from . import views


urlpatterns = [

    path('', views.PgnList.as_view()),
    path('mygames/', views.FetchMyGames.as_view()),
    path('mygames/<int:pgn_pk>/', views.AddPgnToMyGames.as_view()),
    path('favorites/', views.FetchFavorites.as_view()),
    path('favorites/<int:pgn_pk>/', views.AddPgnToFavorites.as_view()),
    path('assigned/', views.FetchAssigned.as_view()),
    path('assigned/<int:pgn_pk>/', views.AddPgnToAssigned.as_view())
    
]