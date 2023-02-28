from django.urls import path
from comment import views

urlpatterns = [
    path('<int:pgn_id>/', views.CommentDetailPgn.as_view()),
    path('<int:fen_id>/', views.CommentDetailFen.as_view()),
    path('<str:game_id>/', views.CommentDetailGame.as_view()),
    path('post/', views.CommentPost.as_view()),
    path('', views.CommentList.as_view())
]
