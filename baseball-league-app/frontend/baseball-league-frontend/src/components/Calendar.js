import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';

const Calendar = () => (
  <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
);

export default Calendar;
