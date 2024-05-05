import csv
import random
from datetime import datetime, timedelta

def random_date():
    today = datetime.today()
    start_year = today.year if today.month < 12 else today.year + 1
    end_year = start_year + 1  # We'll use the start_year and set the end date limit to the next year's end

    # Generate a random start date from today to the end of next year
    start_date = today + timedelta(days=random.randint(1, (datetime(end_year, 12, 31) - today).days))
    # Ensure the trip ends within the same period
    max_duration = (datetime(end_year, 12, 31) - start_date).days
    end_date = start_date + timedelta(days=random.randint(3, max(max_duration, 3)))  # Ensuring minimum of 3 days
    return start_date.strftime("%d/%m/%Y"), end_date.strftime("%d/%m/%Y")

def generate_data(num_entries=200):
    cities = ["Barcelona", "Paris", "Rome", "Amsterdam", "Berlin"]
    interests = ["Art", "Gastronomy", "Music", "Sports"]
    data = []

    for i in range(1, num_entries + 1):
        name = f"Traveller {i}"
        email = f"{name.split()[1].lower()}.{name.split()[0].lower()}@gmail.com"
        password = "test"
        departure_city = random.choice(cities)
        start_date, end_date = random_date()
        arrival_city = random.choice([city for city in cities if city != departure_city])
        interest = random.choice(interests)
        data.append([
            i,  # Trip ID
            name,  # Traveller Name
            start_date,  # Departure Date
            end_date,  # Return Date
            departure_city,  # Departure City
            arrival_city,  # Arrival City
            interest,  # Interests
            email,  # Email
            password,  # Password
            '01'  # Business ID
        ])

    return data

# Generate data
dataset = generate_data()

# Save data to a CSV file
with open('travel_dataset.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Trip ID', 'Traveller Name', 'Departure Date', 'Return Date', 'Departure City', 'Arrival City', 'Interests', 'Email', 'Password', 'Empresa'])  # Header with 'Empresa'
    writer.writerows(dataset)

print("Dataset generated and saved to 'travel_dataset.csv'.")
