import csv
import random
from datetime import datetime, timedelta

def random_date(year):
    start_month = random.choice(range(1, 12))
    start_day = random.choice(range(1, 28))  # Para evitar problemas con febrero
    start_date = datetime(year, start_month, start_day)
    end_date = start_date + timedelta(days=random.randint(3, 15))  # Duración de viaje entre 3 y 15 días
    return start_date.strftime("%d/%m/%Y"), end_date.strftime("%d/%m/%Y")

def generate_data(num_entries=200):
    cities = ["Barcelona", "Amsterdam", "Berlin"]
    interests = ["Art", "Gastronomy", "Music", "Sports"]
    data = []

    # Forzar grupos grandes en ciudades seleccionadas
    groups_info = {
        'Barcelona': {'dates': [(13, '18/08/2024', '28/08/2024'), (4, '05/09/2024', '09/09/2024')], 'count': 0},
        'Paris': {'dates': [(13, '20/08/2024', '30/08/2024'), (5, '01/09/2024', '05/09/2024')], 'count': 0}
    }

    for i in range(1, num_entries + 1):
        name = f"Traveller {i}"
        names = name.split()  # Divide el nombre para crear el email
        email = f"{names[1].lower()}.{names[0].lower()}@gmail.com"  # Crea un email basado en el nombre
        password = "test"  # Contraseña común para todos
        departure_city = random.choice(cities)
        group_info = groups_info.get(departure_city)
        if group_info and group_info['count'] < sum(x[0] for x in group_info['dates']):
            # Asignar fechas basadas en el grupo predefinido
            for size, start_date, end_date in group_info['dates']:
                if group_info['count'] < size:
                    group_info['count'] += 1
                    break
        else:
            # Fechas aleatorias para otros casos
            start_date, end_date = random_date(2024)
        
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
            '01'  # Empresa (nuevo campo)
        ])

    return data

# Generar datos
dataset = generate_data()

# Guardar los datos en un archivo CSV
with open('travel_dataset.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Trip ID', 'Traveller Name', 'Departure Date', 'Return Date', 'Departure City', 'Arrival City', 'Interests', 'Email', 'Password', 'Empresa'])  # Añade 'Empresa' al encabezado
    writer.writerows(dataset)

print("Dataset generado y guardado en 'travel_dataset.csv'.")