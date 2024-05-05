from ..models import *
from rest_framework import status
from ..serializers import *

def user_journeys_api(email):
    try:
        print(email)
        user = User.objects.get(email=email)
        serializer = UserSerializer(user)
        return {'data': serializer.data, 'message': 'All journeys retrieved successfully'}, status.HTTP_200_OK
    except User.DoesNotExist:
        return {'error': 'User does not exist'}, status.HTTP_404_NOT_FOUND


def users_all():
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return {'data': serializer.data, 'message': 'All journeys of a retrieved successfully'}, status.HTTP_200_OK

def fetch_all_users():
    users = User.objects.all()
    serializer = UserBasicSerializer(users, many=True)
    return {'data': serializer.data, 'message': 'All journeys of a retrieved successfully'}, status.HTTP_200_OK

def fetch_activities_by_city_and_dates(city, start_date, end_date):
    activities = Event.objects.filter(city__name=city, date__range=[start_date, end_date])
    serializer = EventSerializer(activities, many=True)
    return {'data': serializer.data, 'message': 'All activities retrieved successfully'}, status.HTTP_200_OK

def fetch_event_participants(event_id):
    event = Event.objects.get(id=event_id)
    serializer = UserBasicSerializer(event.participants, many=True)
    return {'data': serializer.data, 'message': 'All participants retrieved successfully'}, status.HTTP_200_OK

def fetch_city_info(city):
    city = City.objects.get(id=city)
    serializer = CitySerializer(city)
    return {'data': serializer.data, 'message': 'City info retrieved successfully'}, status.HTTP_200_OK