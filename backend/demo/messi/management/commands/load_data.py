from django.core.management.base import BaseCommand
import datetime
from messi.utils.dataPreparation import getData
from messi.models import City, User, Journey, Business

class Command(BaseCommand):
    help = 'Load data from dataPreparation.py into our model'

    def handle(self, *args, **options):
        filepath = "./messi/utils/travel_dataset.csv"
        resultados_finales = getData(filepath)
        
        for ciudad, resultado in resultados_finales:
            city, _ = City.objects.get_or_create(name=ciudad)
            
            for group in resultado:
                for traveler in group:
                    departure_date = datetime.datetime.strptime(traveler['Departure Date'], '%d/%m/%Y').date()
                    return_date = datetime.datetime.strptime(traveler['Return Date'], '%d/%m/%Y').date()

                    journey, _ = Journey.objects.update_or_create(
                        tripID=traveler['Trip ID'],
                        defaults={
                            'departureDate': departure_date,
                            'returnDate': return_date,
                            'departureCity': traveler['Departure City'],
                            'arrivalCity': ciudad  # Use ciudad instead of traveler['Arrival City']
                        }
                    )

                    user_data = {
                        'name': traveler['Traveller Name'],
                        'email': traveler['Email'],
                        'pwd': traveler['Password'],
                        'hobbies': traveler['Interests']
                    }
                    user, created = User.objects.update_or_create(email=traveler['Email'], defaults=user_data)
                    
                    user.journeys.add(journey)
                    
                    journey.cities.add(city)
                    
                    # Crear o actualizar la relación Business
                    business, _ = Business.objects.get_or_create(name='01')  # Valor predeterminado para la empresa

                    journey.businesses.add(business)

        self.stdout.write(self.style.SUCCESS('Successfully loaded data into database'))
