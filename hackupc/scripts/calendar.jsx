import * as Calendar from 'expo-calendar';
import moment from 'moment';

const createEvent = async (title, startDate, location) => {
    try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            const calendar = calendars.find(cal => cal.allowsModifications);
            if (!calendar) {
                console.log('No calendar found that allows modifications');
                return;
            }
            
            const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Adds 2 hours to start date

            const eventId = await Calendar.createEventAsync(calendar.id, {
                title,
                startDate,
                endDate,
                location,
                timeZone: 'UTC'
            });

            console.log(`Event created with ID: ${eventId}`);
        } else {
            console.log('Calendar permission not granted');
        }
    } catch (error) {
        console.error('Failed to create event:', error);
    }
};

export { createEvent };
