from rest_framework import serializers
from .models import Journey, User

class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey
        fields = ['tripID', 'departureDate', 'returnDate', 'departureCity', 'arrivalCity']

class UserSerializer(serializers.ModelSerializer):
    journeys = JourneySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'pwd', 'name', 'hobbies', 'journeys']

    

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'pwd', 'name', 'hobbies']