from django.core.management.base import BaseCommand
import datetime
import requests
from django.db import transaction
from requests.exceptions import RequestException
from messi.utils.dataPreparation import getData
from messi.models import City, User, Journey, Business, Event, Group

class Command(BaseCommand):
    help = 'Load data from dataPreparation.py into our model, including API error handling'

    def handle(self, *args, **options):
        filepath = "./messi/utils/travel_dataset.csv"
        resultados_finales = getData(filepath)
        api_key = '31YeRs4rc6qrFag1dVEEGNljjglE0jEx'  # Asegúrate de usar una clave válida
        
        for ciudad, resultado in resultados_finales:
            city, _ = City.objects.get_or_create(name=ciudad)
            
            for group_data in resultado:
                departure_dates = [datetime.datetime.strptime(traveler['Departure Date'], '%d/%m/%Y').date() for traveler in group_data]
                min_common_date = min(departure_dates)
                max_common_date = max(departure_dates)

                min_date_str = min_common_date.strftime('%Y-%m-%dT00:00:00Z')
                max_date_str = max_common_date.strftime('%Y-%m-%dT23:59:59Z')

                group_obj, _ = Group.objects.get_or_create(date=min_common_date, city=city)

                city2 = 'New York'
                interest2 = 'Music'

                startDate = '2024-05-06T00:00:00Z'
                endDate = '2024-05-15T23:59:59Z'

                interest = group_data[0]['Interests'] if group_data else 'Music'

                url = f'https://app.ticketmaster.com/discovery/v2/events.json?apikey={api_key}&city={ciudad}&keyword=${interest}&startDateTime={min_date_str}&endDateTime={max_date_str}&size=10'
                try:
                    response = requests.get(url)
                    response.raise_for_status()  # Checks HTTP status codes that are not 200
                    events_data = response.json().get('_embedded', {}).get('events', [])
                    if not events_data:
                        print(f"No events found for {city.name} between {min_date_str} and {max_date_str}.")
                    else:
                        for event_info in events_data:
                            event_date_time = event_info['dates']['start'].get('dateTime', None)
                            if event_date_time:
                                with transaction.atomic():
                                    event, created = Event.objects.update_or_create(
                                        name=event_info['name'],
                                        defaults={
                                            'date': event_date_time,
                                            'description': event_info.get('info', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae augue ut nulla dignissim congue. Mauris et fringilla lacus. Proin tempor augue vel felis eleifend, sit amet tristique risus sollicitudin. Integer id metus a libero pulvinar fringilla eget eu arcu. Maecenas vitae neque ut sapien malesuada aliquet. Fusce interdum, ipsum non aliquam ultricies, odio nisi feugiat odio, ac posuere mauris diam ac elit. Morbi sit amet bibendum risus. Duis mollis lorem nec consequat consectetur. Vivamus et purus id elit aliquam sodales. Sed commodo enim id sapien lobortis, eget fermentum ex condimentum. Integer viverra, est nec mattis suscipit, justo est fermentum nulla, a placerat libero ipsum non lacus. Phasellus non nisl libero. Suspendisse potenti. Quisque suscipit mi a orci placerat, vel pulvinar tortor rhoncus. Sed bibendum elit vel dolor tempor, a fermentum velit finibus.'),
                                        }
                                    )
                                    print(f"Attempting to create/update event: {event_info['name']}")
                                    if created:
                                        print(f"Created new event: {event.name}")
                                    else:
                                        print(f"Updated existing event: {event.name}")

                                    city.events.add(event)
                                    print(f"Event added to city {city.name}: {event.name}")
                                print(f"Event {event.name} created for {city.name} on {event.date}.")
                                for traveler in group_data:
                                    user, _ = User.objects.get_or_create(email=traveler['Email'])
                                    event.participants.add(user)
                except RequestException as e:
                    print(f"Error fetching events from Ticketmaster: {e}")

                for traveler in group_data:
                    departure_date = datetime.datetime.strptime(traveler['Departure Date'], '%d/%m/%Y').date()
                    return_date = datetime.datetime.strptime(traveler['Return Date'], '%d/%m/%Y').date()

                    journey, _ = Journey.objects.update_or_create(
                        tripID=traveler['Trip ID'],
                        defaults={
                            'departureDate': departure_date,
                            'returnDate': return_date,
                            'departureCity': traveler['Departure City'],
                            'arrivalCity': ciudad
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
                    
                    business, _ = Business.objects.get_or_create(name='01')
                    journey.businesses.add(business)

        self.stdout.write(self.style.SUCCESS('Successfully loaded data into database'))
