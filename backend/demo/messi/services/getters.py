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