import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function EventSearch() {
  const [events, setEvents] = useState([]);

  const API_KEY = '31YeRs4rc6qrFag1dVEEGNljjglE0jEx'; // Reemplaza YOUR_API_KEY_HERE con tu clave de API real
  const city = 'New York'; // Ciudad predefinida
  const interest = 'Sport'; // Interés predefinido

  useEffect(() => {
    const fetchEvents = async () => {
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=${city}&keyword=${interest}&size=5`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const eventsData = data._embedded ? data._embedded.events : [];
        setEvents(eventsData);

        // Aquí puedes manejar el JSON de eventos como necesites
        handleEventJSON(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  // Función para manejar los datos de eventos en formato JSON
  function handleEventJSON(eventsData) {
    console.log("Event Data in JSON:", JSON.stringify(eventsData, null, 2));
  }

  // Este texto es solo para indicar que la prueba está corriendo, puedes quitarlo si no deseas UI.
  return (
    <View>
      <Text>Check console for event data.</Text>
    </View>
  );
}

export default EventSearch;
