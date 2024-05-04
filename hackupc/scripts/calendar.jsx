import { Linking, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import moment from 'moment';

// Define los valores de las variables directamente en el archivo
const title = 'Reunión de trabajo';
const startDate = new Date(2022, 1, 1, 10, 0, 0);  // 1 de febrero de 2022 a las 10:00
const endDate = new Date(2022, 1, 1, 11, 0, 0);  // 1 de febrero de 2022 a las 11:00
const location = 'Oficina central';
const url = 'https://www.example.com';

const calendarIosFail = {
  message: "Error al abrir el calendario",
  type: "danger",
};

const showMessage = (messageConfig) => {
  Alert.alert(messageConfig.message);
};

// iOS: Requires # of seconds from January 1 2001 of the date you want to open calendar on
const referenceDate = moment.utc('2001-01-01');
const secondsSinceRefDateiOS = startDate - referenceDate.unix();

const createEvent = async () => {
    try {
      // Solicita permisos para acceder al calendario
      const { status } = await Calendar.requestCalendarPermissionsAsync();
  
      if (status === 'granted') {
        // Obtener todos los calendarios
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  
        // Buscar un calendario que se pueda utilizar (en este caso, el primer calendario disponible)
        const calendar = calendars.find(cal => cal.allowsModifications);
  
        if (!calendar) {
          // Si no se encuentra un calendario que permita modificaciones, imprime un mensaje en la consola y termina la función
          console.log('No se encontró un calendario que permita modificaciones');
          return;
        }
  
        // Crear evento en el calendario encontrado
        const eventId = await Calendar.createEventAsync(calendar.id, {
          title: 'Título del evento', // Título del evento
          startDate: new Date('2024-6-25T20:00:00.000Z'), // Fecha y hora de inicio del evento
          endDate: new Date('2024-6-25T22:00:00.000Z'), // Fecha y hora de finalización del evento
          location: 'Ubicación del evento', // Ubicación del evento
        });
  
        console.log(eventId); // Imprime el ID del evento creado
      } else {
        // Si los permisos no son otorgados, imprime un mensaje en la consola
        console.log('Permisos no otorgados');
      }
    } catch (error) {
      // Si ocurre algún error durante la solicitud de permisos o la creación del evento, imprime el error en la consola
      console.error(error);
    }
  };

export { createEvent }; // Llama a la función inmediatamente después de su definición