'use client';

import { RedirectButton } from '@/components/buttons/redirect-button';
import EventListEntry from '@/components/custom-ui/event-list-entry';
import { Label } from '@/components/ui/label';
import { useGetApiEvent } from '@/generated/api/event/event';

export default function Events() {
  const { data: eventsData, isLoading, error } = useGetApiEvent();

  if (isLoading) return <div className='text-center mt-10'>Loading...</div>;
  if (error)
    return (
      <div className='text-center mt-10 text-red-500'>Error loading events</div>
    );

  const events = eventsData?.data?.events || [];

  return (
    <div
      className='relative h-full flex flex-col items-center'
      data-cy='events-page'
    >
      {/* Heading */}
      <h1 className='text-3xl font-bold mt-8 mb-4 text-center z-10'>
        My Events
      </h1>

      {/* Scrollable event list */}
      <div className='w-full flex justify-center overflow-hidden'>
        <div className='grid gap-8 not-visited:p-6 overflow-y-auto'>
          {events.length > 0 ? (
            events.map((event) => (
              <EventListEntry
                key={event.id}
                {...event}
                created_at={new Date(event.created_at)}
                updated_at={new Date(event.updated_at)}
              />
            ))
          ) : (
            <div className='flex flex-1 flex-col items-center justify-center min-h-[300px]'>
              <Label size='large' className='justify-center text-center'>
                You don&#39;t have any events right now
              </Label>
              <RedirectButton
                redirectUrl='/events/new'
                buttonText='create Event'
                className='mt-4'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
