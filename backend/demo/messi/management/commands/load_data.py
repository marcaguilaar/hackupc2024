from django.core.management.base import BaseCommand
import sys
import datetime
sys.path.append('../../utils')
print(sys.path)
from messi.utils.dataPreparation import getData
from messi.models import City, User, Journey, UserJourney, JourneyCity

class Command(BaseCommand):
    help = 'Load data from dataPreparation.py into our model'

    def handle(self, *args, **options):
        filepath = "travel_dataset.csv"
        data_list = getData(filepath)
        for data in data_list:
            city_name = data['Arrival City']
            city, _ = City.objects.get_or_create(name=city_name)
            
            for traveler in data['Group']:
                departure_date = datetime.datetime.strptime(traveler['Departure Date'], '%d/%m/%Y').date()
                return_date = datetime.datetime.strptime(traveler['Return Date'], '%d/%m/%Y').date()

                journey, _ = Journey.objects.update_or_create(
                    tripID=traveler['Trip ID'],
                    defaults={
                        'departureDate': departure_date,
                        'returnDate': return_date,
                        'departureCity': traveler['Departure City'],
                        'arrivalCity': traveler['Arrival City']
                    }
                )

                user_data = {
                    'name': traveler['Traveller Name'],
                    'email': traveler['Email'],
                    'pwd': traveler['Password'],
                    'hobbies': traveler['Interests']
                }
                user, created = User.objects.update_or_create(email=traveler['Email'], defaults=user_data)
                
                # Crear o actualizar la relación UserJourney
                user_journey, _ = UserJourney.objects.update_or_create(
                    user=user,
                    journey=journey,
                    defaults={
                        'date': departure_date,
                        'status': 'Active'
                    }
                )
                
                # Crear o actualizar la relación JourneyCity
                journey_city, _ = JourneyCity.objects.update_or_create(
                    journey=journey,
                    city=city,
                    defaults={
                        'date': departure_date,
                        'status': 'Planned'
                    }
                )

        self.stdout.write(self.style.SUCCESS('Successfully loaded data into database'))
