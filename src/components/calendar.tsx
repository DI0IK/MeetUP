'use client';

import { Calendar as RBCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import '@/components/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import CustomToolbar from '@/components/custom-toolbar';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePatchApiEventEventID } from '@/generated/api/event/event';
import { useSession } from 'next-auth/react';
import { UserCalendarSchemaItem } from '@/generated/api/meetup.schemas';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { fromZodIssue } from 'zod-validation-error/v4';
import type { $ZodIssue } from 'zod/v4/core';
import { useGetApiCalendar } from '@/generated/api/calendar/calendar';
import { usePatchApiBlockedSlotsSlotID } from '@/generated/api/blocked-slots/blocked-slots';

moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 4,
  },
});

function eventPropGetter(event: {
  id: string;
  start: Date;
  end: Date;
  type: UserCalendarSchemaItem['type'];
  userId?: string;
  colorOverride?: string;
}) {
  return {
    style: event.colorOverride
      ? { backgroundColor: event.colorOverride }
      : undefined,
  };
}

const DaDRBCalendar = withDragAndDrop<
  {
    id: string;
    start: Date;
    end: Date;
    type: UserCalendarSchemaItem['type'];
    userId?: string;
    organizer?: string;
  },
  {
    id: string;
    title: string;
    type: UserCalendarSchemaItem['type'];
  }
>(RBCalendar);

const localizer = momentLocalizer(moment);

export default function Calendar({
  userId,
  height,
  additionalEvents = [],
  className,
}: {
  userId?: string | string[];
  height: string;
  additionalEvents?: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: UserCalendarSchemaItem['type'];
    userId?: string;
    colorOverride?: string;
  }[];
  className?: string;
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => (
            <div className='flex flex-col items-center justify-center h-full'>
              There was an error!
              <p className='text-red-500'>
                {typeof error === 'string'
                  ? error
                  : error.errors
                      .map((e: $ZodIssue) => fromZodIssue(e).toString())
                      .join(', ')}
              </p>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </div>
          )}
        >
          {typeof userId === 'string' ? (
            <CalendarWithUserEvents
              userId={userId}
              height={height}
              additionalEvents={additionalEvents}
              className={className}
            />
          ) : Array.isArray(userId) && userId.length > 0 ? (
            <CalendarWithMultiUserEvents
              userIds={userId}
              height={height}
              additionalEvents={additionalEvents}
              className={className}
            />
          ) : (
            <CalendarWithoutUserEvents
              height={height}
              additionalEvents={additionalEvents}
              className={className}
            />
          )}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function CalendarWithUserEvents({
  userId,
  height,
  additionalEvents,
  className,
}: {
  userId: string;
  height: string;
  additionalEvents?: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: UserCalendarSchemaItem['type'];
    userId?: string;
    colorOverride?: string;
  }[];
  className?: string;
}) {
  const sesstion = useSession();
  const [currentView, setCurrentView] = React.useState<
    'month' | 'week' | 'day' | 'agenda' | 'work_week'
  >('week');
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const router = useRouter();

  const { data, refetch, error, isError } = useGetApiCalendar(
    {
      userIds: [userId],
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
    },
    {
      query: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
    },
  );

  if (isError) {
    throw error.response?.data || 'Failed to fetch calendar data';
  }

  const { mutate: patchEvent } = usePatchApiEventEventID({
    mutation: {
      throwOnError(error) {
        throw error.response?.data || 'Failed to update event';
      },
    },
  });
  const { mutate: patchBlockedSlot } = usePatchApiBlockedSlotsSlotID({
    mutation: {
      throwOnError(error) {
        throw error.response?.data || 'Failed to update blocked slot';
      },
    },
  });

  return (
    <DaDRBCalendar
      className={className}
      eventPropGetter={eventPropGetter}
      localizer={localizer}
      culture='de-DE'
      defaultView='week'
      components={{
        toolbar: CustomToolbar,
      }}
      style={{
        height: height,
      }}
      onView={setCurrentView}
      view={currentView}
      date={currentDate}
      onNavigate={(date) => {
        setCurrentDate(date);
      }}
      events={[
        ...(data?.data.calendar.map((event) => ({
          id: event.id,
          title: event.type === 'event' ? event.title : 'Blocker',
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          type: event.type,
          userId: event.users[0],
          organizer: event.type === 'event' ? event.organizer_id : undefined,
        })) ?? []),
        ...(additionalEvents ?? []),
      ]}
      onSelectEvent={(event) => {
        if (event.type === 'blocked_private') return;
        if (event.type === 'blocked_owned') {
          router.push(`/blocked_slots/${event.id}`);
          return;
        }
        if (event.type === 'event') {
          router.push(`/events/${event.id}`);
        }
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
        if (
          droppedEvent.type === 'blocked_private' ||
          (droppedEvent.organizer &&
            droppedEvent.organizer !== sesstion.data?.user?.id)
        )
          return;
        const startISO = new Date(start).toISOString();
        const endISO = new Date(end).toISOString();
        if (droppedEvent.type === 'blocked_owned') {
          patchBlockedSlot(
            {
              slotID: droppedEvent.id,
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
                console.error('Error updating blocked slot:', error);
              },
            },
          );
          return;
        } else if (droppedEvent.type === 'event') {
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
        }
      }}
      onEventResize={(event) => {
        const { start, end, event: resizedEvent } = event;
        if (
          resizedEvent.type === 'blocked_private' ||
          (resizedEvent.organizer &&
            resizedEvent.organizer !== sesstion.data?.user?.id)
        )
          return;
        const startISO = new Date(start).toISOString();
        const endISO = new Date(end).toISOString();
        if (startISO === endISO) {
          console.warn('Start and end times are the same, skipping resize.');
          return;
        }
        if (resizedEvent.type === 'blocked_owned') {
          patchBlockedSlot(
            {
              slotID: resizedEvent.id,
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
                console.error('Error resizing blocked slot:', error);
              },
            },
          );
          return;
        } else if (resizedEvent.type === 'event') {
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
        }
      }}
    />
  );
}

function CalendarWithMultiUserEvents({
  userIds,
  height,
  additionalEvents,
  className,
}: {
  userIds: string[];
  height: string;
  additionalEvents?: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: UserCalendarSchemaItem['type'];
    userId?: string;
    colorOverride?: string;
  }[];
  className?: string;
}) {
  const [currentView, setCurrentView] = React.useState<
    'month' | 'week' | 'day' | 'agenda' | 'work_week'
  >('week');
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  const { data, error, isError } = useGetApiCalendar(
    {
      userIds: userIds,
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
    },
    {
      query: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
    },
  );

  if (isError) {
    throw error.response?.data || 'Failed to fetch calendar data';
  }

  return (
    <DaDRBCalendar
      className={className}
      eventPropGetter={eventPropGetter}
      localizer={localizer}
      culture='de-DE'
      defaultView='week'
      components={{
        toolbar: CustomToolbar,
      }}
      style={{
        height: height,
      }}
      onView={setCurrentView}
      view={currentView}
      date={currentDate}
      onNavigate={(date) => {
        setCurrentDate(date);
      }}
      events={[
        ...(data?.data.calendar.map((event) => ({
          id: event.id,
          title: event.type === 'event' ? event.title : 'Blocker',
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          type: event.type,
          userId: event.users[0],
        })) ?? []),
        ...(additionalEvents ?? []),
      ]}
    />
  );
}

function CalendarWithoutUserEvents({
  height,
  additionalEvents,
  className,
}: {
  height: string;
  additionalEvents?: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: UserCalendarSchemaItem['type'];
    userId?: string;
    colorOverride?: string;
  }[];
  className?: string;
}) {
  const [currentView, setCurrentView] = React.useState<
    'month' | 'week' | 'day' | 'agenda' | 'work_week'
  >('week');
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  return (
    <DaDRBCalendar
      className={className}
      eventPropGetter={eventPropGetter}
      localizer={localizer}
      culture='de-DE'
      defaultView='week'
      style={{
        height: height,
      }}
      components={{
        toolbar: CustomToolbar,
      }}
      onView={setCurrentView}
      view={currentView}
      date={currentDate}
      onNavigate={(date) => {
        setCurrentDate(date);
      }}
      events={additionalEvents}
    />
  );
}
