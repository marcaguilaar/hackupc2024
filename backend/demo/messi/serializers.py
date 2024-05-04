from rest_framework import serializers
from .models import Journey, User, Event

class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey
        fields = ['tripID', 'departureDate', 'returnDate', 'departureCity', 'arrivalCity']

class UserSerializer(serializers.ModelSerializer):
    journeys = JourneySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'pwd', 'name', 'hobbies', 'journeys']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date', 'city', 'description', 'participants']

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'pwd', 'name', 'hobbies']