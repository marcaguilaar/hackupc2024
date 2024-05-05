from django.urls import path
from . import views

urlpatterns = [
    path("users/<str:email>/journeys", views.users_journeys, name="user_journeys_api"),
    path("users", views.users_all, name="users_all"),
    path("activities/<str:city>/<str:start_date>/<str:end_date>", views.activities_by_city_and_dates, name="activities_by_city_and_dates"),
    path("events/<int:event_id>/participants", views.event_participants, name="event_participants"),
    path("cities/<int:city>", views.city_info, name="city_info"),
]