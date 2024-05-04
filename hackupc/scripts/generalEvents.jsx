import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function General({ city: cityProp }) {
  const [sights, setSights] = useState([]);
  const [events, setEvents] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const API_KEY = 'AIzaSyAemKlxqVjYT2_96KEWAajSrtKo7gG_tXw'; // Reemplaza esto con tu clave de API de Google Places
  const city = cityProp || 'Barcelona'; // Usa la ciudad del prop, o 'Barcelona' si no se proporciona ninguna ciudad
  

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Buscar lugares emblemáticos
        const sightsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}+points+of+interest&key=${API_KEY}`);
        const sightsData = await sightsResponse.json();
        const sightsResults = sightsData.results.slice(0, 5).map(place => ({ name: place.name, address: place.formatted_address }));
        setSights(sightsResults);
        console.log('Lugares emblemáticos:', sightsResults);
        
        // Buscar restaurantes
        const restaurantsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=${API_KEY}`);
        const restaurantsData = await restaurantsResponse.json();
        const restaurantsResults = restaurantsData.results.slice(0, 5).map(place => ({ name: place.name, address: place.formatted_address }));
        setRestaurants(restaurantsResults);
        console.log('Restaurantes:', restaurantsResults);
      } catch (error) {
        console.log('Error fetching places:', error);
      }
    };
  
    fetchPlaces();
  }, [city]);

  return (
    <View>
      {/* Renderizar los lugares turísticos, eventos y restaurantes aquí */}
    </View>
  );
}

export default General;