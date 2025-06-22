'use client';

import { Calendar as RBCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import '@/components/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import CustomToolbar from '@/components/custom-toolbar';
import React from 'react';
import { useGetApiUserUserCalendar } from '@/generated/api/user/user';
import { useRouter } from 'next/navigation';
import { usePatchApiEventEventID } from '@/generated/api/event/event';
import { useSession } from 'next-auth/react';

moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 4,
  },
});

const DaDRBCalendar = withDragAndDrop<
  {
    id: string;
    start: Date;
    end: Date;
  },
  {
    id: string;
    title: string;
  }
>(RBCalendar);

const localizer = momentLocalizer(moment);

export default function Calendar({ userId }: { userId: string }) {
  const sesstion = useSession();
  const [currentView, setCurrentView] = React.useState<
    'month' | 'week' | 'day' | 'agenda' | 'work_week'
  >('week');
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const router = useRouter();

  const { data, refetch } = useGetApiUserUserCalendar(userId, {
    start: moment(currentDate)
      .startOf(
        currentView === 'agenda'
          ? 'month'
          : currentView === 'work_week'
            ? 'week'
            : currentView,
      )
      .toISOString(),
    end: moment(currentDate)
      .endOf(
        currentView === 'agenda'
          ? 'month'
          : currentView === 'work_week'
            ? 'week'
            : currentView,
      )
      .toISOString(),
  });

  const { mutate: patchEvent } = usePatchApiEventEventID();

  return (
    <DaDRBCalendar
      localizer={localizer}
      style={{ height: 500 }}
      culture='de-DE'
      defaultView='week'
      components={{
        toolbar: CustomToolbar,
      }}
      onView={setCurrentView}
      view={currentView}
      date={currentDate}
      onNavigate={(date) => {
        setCurrentDate(date);
      }}
      events={
        data?.data.calendar.map((event) => ({
          id: event.id,
          title: event.type === 'event' ? event.title : 'Blocker',
          start: new Date(event.start_time),
          end: new Date(event.end_time),
        })) ?? []
      }
      onSelectEvent={(event) => {
        router.push(`/events/${event.id}`);
      }}
      onSelectSlot={(slotInfo) => {
        router.push(
          `/events/new?start=${slotInfo.start.toISOString()}&end=${slotInfo.end.toISOString()}`,
        );
      }}
      resourceIdAccessor={(event) => event.id}
      resourceTitleAccessor={(event) => event.title}
      startAccessor={(event) => event.start}
      endAccessor={(event) => event.end}
      selectable={sesstion.data?.user?.id === userId}
      onEventDrop={(event) => {
        const { start, end, event: droppedEvent } = event;
        const startISO = new Date(start).toISOString();
        const endISO = new Date(end).toISOString();
        patchEvent(
          {
            eventID: droppedEvent.id,
            data: {
              start_time: startISO,
              end_time: endISO,
            },
          },
          {
            onSuccess: () => {
              refetch();
            },
            onError: (error) => {
              console.error('Error updating event:', error);
            },
          },
        );
      }}
      onEventResize={(event) => {
        const { start, end, event: resizedEvent } = event;
        const startISO = new Date(start).toISOString();
        const endISO = new Date(end).toISOString();
        patchEvent(
          {
            eventID: resizedEvent.id,
            data: {
              start_time: startISO,
              end_time: endISO,
            },
          },
          {
            onSuccess: () => {
              refetch();
            },
            onError: (error) => {
              console.error('Error resizing event:', error);
            },
          },
        );
      }}
    />
  );
}
