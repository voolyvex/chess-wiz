from django.urls import path
from comment import views

urlpatterns = [
    path('', views.CommentList.as_view()),
    path('<int:pgn_id>/', views.CommentList.as_view()),
    path('<str:game_id>/', views.CommentList.as_view()),
    path('<int:fen_id>/', views.CommentList.as_view()),
    path('post/', views.CommentPost.as_view()),
    
]
