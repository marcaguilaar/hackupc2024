from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import permission_classes


from .models import *
from .serializers import *

from .services.getters import *

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def users_journeys(request, email):
    result, status_code = user_journeys_api(email)
    return JsonResponse(result, status=status_code)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def users_all(request):
    users, status_code = fetch_all_users()
    return JsonResponse(users, status=status_code)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def activities_by_city_and_dates(request, city, start_date, end_date):
    result, status_code = fetch_activities_by_city_and_dates(city, start_date, end_date)
    return JsonResponse(result, status=status_code)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def event_participants(request, event_id):
    result, status_code = fetch_event_participants(event_id)
    return JsonResponse(result, status=status_code)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def city_info(request, city):
    result, status_code = fetch_city_info(city)
    return JsonResponse(result, status=status_code)

