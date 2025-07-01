'use client';
import React from 'react';
import LabeledInput from '@/components/custom-ui/labeled-input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/misc/logo';
import TimePicker from '@/components/time-picker';
import { Label } from '@/components/ui/label';
import { useGetApiUserMe } from '@/generated/api/user/user';
import {
  usePostApiEvent,
  useGetApiEventEventID,
  usePatchApiEventEventID,
} from '@/generated/api/event/event';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ToastInner } from '@/components/misc/toast-inner';
import { UserSearchInput } from '@/components/misc/user-search';
import ParticipantListEntry from '../custom-ui/participant-list-entry';

import { useSearchParams } from 'next/navigation';

import zod from 'zod/v4';
import { PublicUserSchema } from '@/app/api/user/validation';
import Calendar from '@/components/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type User = zod.output<typeof PublicUserSchema>;

interface EventFormProps {
  type: 'create' | 'edit';
  eventId?: string;
}

const EventForm: React.FC<EventFormProps> = (props) => {
  // Runtime validation
  if (props.type === 'edit' && !props.eventId) {
    throw new Error(
      'Error [event-form]: eventId must be provided when type is "edit".',
    );
  }

  const searchParams = useSearchParams();
  const startFromUrl = searchParams.get('start');
  const endFromUrl = searchParams.get('end');

  const {
    mutateAsync: createEvent,
    status,
    isSuccess,
    error,
  } = usePostApiEvent();
  const { data, isLoading, error: fetchError } = useGetApiUserMe();
  const { data: eventData } = useGetApiEventEventID(props.eventId!, {
    query: { enabled: props.type === 'edit' },
  });
  const patchEvent = usePatchApiEventEventID();
  const router = useRouter();

  // State for date and time fields
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = React.useState('');
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = React.useState('');

  // State for participants
  const [selectedParticipants, setSelectedParticipants] = React.useState<
    User[]
  >([]);

  // State for form fields
  const [title, setTitle] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [calendarOpen, setCalendarOpen] = React.useState(false);

  // Update state when event data loads
  React.useEffect(() => {
    if (props.type === 'edit' && eventData?.data?.event) {
      setTitle(eventData?.data?.event.title || '');
      // Parse start_time and end_time
      if (eventData?.data?.event.start_time) {
        const start = new Date(eventData?.data?.event.start_time);
        setStartDate(start);
        setStartTime(start.toTimeString().slice(0, 5)); // "HH:mm"
      }
      if (eventData?.data?.event.end_time) {
        const end = new Date(eventData?.data?.event.end_time);
        setEndDate(end);
        setEndTime(end.toTimeString().slice(0, 5)); // "HH:mm"
      }
      setLocation(eventData?.data?.event.location || '');
      setDescription(eventData?.data?.event.description || '');
      setSelectedParticipants(
        eventData?.data?.event.participants?.map((u) => u.user) || [],
      );
    } else if (props.type === 'create' && startFromUrl && endFromUrl) {
      // If creating a new event with URL params, set title and dates
      setTitle('');
      const start = new Date(startFromUrl);
      setStartDate(start);
      setStartTime(start.toTimeString().slice(0, 5)); // "HH:mm"
      const end = new Date(endFromUrl);
      setEndDate(end);
      setEndTime(end.toTimeString().slice(0, 5)); // "HH:mm"
    }
  }, [eventData?.data?.event, props.type, startFromUrl, endFromUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    function combine(date?: Date, time?: string) {
      if (!date || !time) return undefined;
      const [hours, minutes] = time.split(':');
      const d = new Date(date);
      d.setHours(Number(hours), Number(minutes), 0, 0);
      return d;
    }

    const start = combine(startDate, startTime);
    const end = combine(endDate, endTime);

    //validate form data
    if (!formData.get('eventName')) {
      alert('Event name is required.');
      return;
    }
    if (!start || !end) {
      alert('Please provide both start and end date/time.');
      return;
    } else if (start >= end) {
      alert('End time must be after start time.');
      return;
    }

    const data = {
      title: formData.get('eventName') as string,
      description: formData.get('eventDescription') as string,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      location: formData.get('eventLocation') as string,
      created_at: formData.get('createdAt') as string,
      updated_at: formData.get('updatedAt') as string,
      organiser: formData.get('organiser') as string,
      participants: selectedParticipants.map((u) => u.id),
    };

    let eventID: string | undefined;

    if (props.type === 'edit' && props.eventId) {
      const mutationResult = await patchEvent.mutateAsync({
        eventID: props.eventId,
        data: {
          title: data.title,
          description: data.description,
          start_time: data.start_time,
          end_time: data.end_time,
          location: data.location,
          participants: data.participants,
        },
      });
      eventID = mutationResult.data.event.id;
      console.log('Updating event');
    } else {
      console.log('Creating event');
      const mutationResult = await createEvent({ data });
      eventID = mutationResult.data.event.id;
    }

    toast.custom((t) => (
      <ToastInner
        toastId={t}
        title='Event saved'
        description={eventData?.data?.event.title}
        onAction={() => router.push(`/events/${eventID}`)}
        variant='success'
        buttonText='show'
      />
    ));

    router.back();
  }

  // Use DB values for created_at/updated_at in edit mode
  const createdAtValue =
    props.type === 'edit' && eventData?.data?.event?.created_at
      ? eventData.data.event.created_at
      : new Date().toISOString();
  const updatedAtValue =
    props.type === 'edit' && eventData?.data?.event?.updated_at
      ? eventData.data.event.updated_at
      : new Date().toISOString();

  // Format date for display
  const createdAtDisplay = new Date(createdAtValue).toLocaleDateString();
  const updatedAtDisplay = new Date(updatedAtValue).toLocaleDateString();

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (props.type === 'edit' && isLoading) return <div>Loading...</div>;
  if (props.type === 'edit' && fetchError)
    return <div>Error loading event.</div>;

  return (
    <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
      <form
        className='flex flex-col gap-5 w-full'
        onSubmit={handleSubmit}
        data-cy='event-form'
      >
        <div className='grid grid-row-start:auto gap-4 sm:gap-8 w-full'>
          <div className='h-full w-full mt-0 ml-2 mb-16 flex items-center max-sm:grid max-sm:grid-row-start:auto max-sm:mb-6 max-sm:mt-10 max-sm:ml-0'>
            <div className='w-[100px] max-sm:w-full max-sm:flex max-sm:justify-center'>
              <Logo colorType='monochrome' logoType='submark' width={50} />
            </div>
            <div className='items-center ml-auto mr-auto max-sm:mb-6 max-sm:w-full'>
              <LabeledInput
                type='text'
                label='Event Name'
                placeholder={
                  props.type === 'create' ? 'New Event' : 'Event Name'
                }
                name='eventName'
                variantSize='big'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-cy='event-name-input'
              />
            </div>
            <div className='w-0 sm:w-[50px]'></div>
          </div>
          <div className='grid grid-cols-4 gap-4 h-full w-full max-lg:grid-cols-2 max-sm:grid-cols-1'>
            <div>
              <TimePicker
                dateLabel='start Time'
                timeLabel='&nbsp;'
                date={startDate}
                setDate={setStartDate}
                time={startTime}
                setTime={setStartTime}
                data-cy='event-start-time-picker'
              />
            </div>
            <div>
              <TimePicker
                dateLabel='end Time'
                timeLabel='&nbsp;'
                date={endDate}
                setDate={setEndDate}
                time={endTime}
                setTime={setEndTime}
                data-cy='event-end-time-picker'
              />
            </div>
            <div className='w-54'>
              <LabeledInput
                type='text'
                label='Location'
                placeholder='where is the event?'
                name='eventLocation'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                data-cy='event-location-input'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-row gap-2'>
                <Label className='w-[70px]'>created:</Label>
                <Label className='text-[var(--color-neutral-300)]'>
                  {createdAtDisplay}
                </Label>
              </div>
              <div className='flex flex-row gap-2'>
                <Label className='w-[70px]'>updated:</Label>
                <p className='text-[var(--color-neutral-300)]'>
                  {updatedAtDisplay}
                </p>
              </div>
            </div>
          </div>
          <div className='h-full w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
            <div className='h-full w-full grid grid-flow-row gap-4'>
              <div className='h-full w-full'>
                <div className='flex flex-row gap-2'>
                  <Label>Organiser:</Label>
                  <p className='text-[var(--color-neutral-300)]'>
                    {!isClient || isLoading
                      ? 'Loading...'
                      : data?.data.user?.name || 'Unknown User'}
                  </p>
                </div>
              </div>
              <div className='h-full w-full'>
                <LabeledInput
                  type='text'
                  label='Event Description'
                  placeholder='What is the event about?'
                  name='eventDescription'
                  variantSize='textarea'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  data-cy='event-description-input'
                ></LabeledInput>
              </div>
            </div>
            <div className='h-full w-full'>
              <Label>Participants</Label>
              <UserSearchInput
                selectedUsers={selectedParticipants}
                addUserAction={(user) => {
                  setSelectedParticipants((current) =>
                    current.find((u) => u.id === user.id)
                      ? current
                      : [...current, user],
                  );
                }}
                removeUserAction={(user) => {
                  setSelectedParticipants((current) =>
                    current.filter((u) => u.id !== user.id),
                  );
                }}
              />
              <DialogTrigger asChild>
                <Button variant='primary'>Calendar</Button>
              </DialogTrigger>
              <div className='grid grid-cols-1 mt-3 sm:max-h-60 sm:grid-cols-2  sm:overflow-y-auto sm:mb-0'>
                {selectedParticipants.map((user) => (
                  <ParticipantListEntry
                    key={user.id}
                    user={user}
                    status='PENDING'
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-row gap-2 justify-end mt-4 mb-6'>
            <div className='w-[20%] grid max-sm:w-[40%]'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  router.back();
                  console.log('user aborted - no change in database');
                }}
              >
                cancel
              </Button>
            </div>
            <div className='w-[20%] grid max-sm:w-[40%]'>
              <Button
                type='submit'
                variant='primary'
                disabled={status === 'pending'}
                data-cy='event-save-button'
              >
                {status === 'pending' ? 'Saving...' : 'save event'}
              </Button>
            </div>
          </div>
          {isSuccess && <p>Event created!</p>}
          {error && <p className='text-red-500'>Error: {error.message}</p>}
        </div>
      </form>
      <DialogContent className='sm:max-w-[750px]'>
        <DialogHeader>
          <DialogTitle>Calendar</DialogTitle>
          <DialogDescription>
            Calendar for selected participants
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='max-w-[calc(100svw-70px)]'>
          <Calendar
            userId={selectedParticipants.map((u) => u.id)}
            additionalEvents={[
              {
                id: 'temp-event',
                title: title || 'New Event',
                start: startDate ? new Date(startDate) : new Date(),
                end: endDate ? new Date(endDate) : new Date(),
                type: 'event',
                userId: 'create-event',
                colorOverride: '#ff9800',
              },
            ]}
            height='600px'
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
