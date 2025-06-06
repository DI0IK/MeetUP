"use client";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '@/components/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import CustomToolbar from '@/components/custom-toolbar';

moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 4,
  },
});

const localizer = momentLocalizer(moment)

const MyCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      //events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      culture="de-DE"
      defaultView='week'

      /*CustomToolbar*/
      components={{
        toolbar: CustomToolbar
      }}
      /*CustomToolbar*/
    />
  </div>
)

export default MyCalendar;
