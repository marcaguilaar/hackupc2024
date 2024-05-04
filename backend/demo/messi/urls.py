from django.urls import path
from . import views

urlpatterns = [
    path("users/<str:email>/journeys", views.users_journeys, name="user_journeys_api"),
    path("users", views.users_all, name="users_all"),
]