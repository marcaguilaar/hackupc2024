import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function EventSearch() {
  const [events, setEvents] = useState([]);

  const API_KEY = '31YeRs4rc6qrFag1dVEEGNljjglE0jEx'; // Clave de API real
  const city = 'New York'; // Ciudad predefinida
  const interest = 'Music'; // Interés predefinido

  const startDate = '2024-05-06T00:00:00Z'; // Fecha de inicio en formato ISO-8601
const endDate = '2024-05-15T23:59:59Z'; // Fecha de fin en formato ISO-8601

useEffect(() => {
  const fetchEvents = async () => {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=${city}&keyword=${interest}&startDateTime=${startDate}&endDateTime=${endDate}&size=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const eventsData = data._embedded ? data._embedded.events.map(event => {
        return {
          name: event.name,
          dateTime: event.dates.start.dateTime,
          venueName: event._embedded.venues[0].name,
          address: event._embedded.venues[0].address.line1
        };
      }) : [];

      if (eventsData.length === 0) {
        console.log('No se encontraron eventos entre las fechas especificadas.');
      } else {
        setEvents(eventsData);
      }

      eventsData.forEach(event => {
        console.log(`Nombre: ${event.name}, Fecha y hora: ${event.dateTime}, Lugar: ${event.venueName}, Dirección: ${event.address}`);
      });
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };

  fetchEvents();
}, []);

  return (
    <View>
      <Text>Check console for event data.</Text>
    </View>
  );
}

export default EventSearch;
