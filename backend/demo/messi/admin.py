from django.contrib import admin
from .models import User, Journey, City, Business, Planning, Event, UserJourney, JourneyBusiness, JourneyCity, CityEvent

admin.site.register(User)
admin.site.register(Journey)
admin.site.register(City)
admin.site.register(Business)
admin.site.register(Planning)
admin.site.register(Event)
admin.site.register(UserJourney)
admin.site.register(JourneyBusiness)
admin.site.register(JourneyCity)

