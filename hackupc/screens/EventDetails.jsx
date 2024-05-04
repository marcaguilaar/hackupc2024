import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createEvent } from '../scripts/calendar';

const EventDetails = () => {
  useEffect(() => {
    createEvent();
  }, []);

  return (
    <View>
      <Text>Detalles del evento</Text>
    </View>
  );
};

export default EventDetails;
