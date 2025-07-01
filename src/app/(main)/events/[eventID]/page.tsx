'use client';

import React, { useState } from 'react';
import Logo from '@/components/misc/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  useDeleteApiEventEventID,
  useGetApiEventEventID,
} from '@/generated/api/event/event';
import { useGetApiUserMe } from '@/generated/api/user/user';
import { RedirectButton } from '@/components/buttons/redirect-button';
import { useSession } from 'next-auth/react';
import ParticipantListEntry from '@/components/custom-ui/participant-list-entry';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ToastInner } from '@/components/misc/toast-inner';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ShowEvent() {
  const session = useSession();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { eventID: eventID } = useParams<{ eventID: string }>();

  // Fetch event data
  const { data: eventData, isLoading, error } = useGetApiEventEventID(eventID);
  const { data: userData, isLoading: userLoading } = useGetApiUserMe();
  const deleteEvent = useDeleteApiEventEventID();

  if (isLoading || userLoading) {
    return (
      <div className='flex justify-center items-center h-full'>Loading...</div>
    );
  }
  if (error || !eventData?.data?.event) {
    return (
      <div className='flex justify-center items-center h-full'>
        Error loading event.
      </div>
    );
  }

  // Format dates & times for display
  const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString();
  };
  const formatTime = (isoString?: string) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[80%] max-w-screen p-0 gap-0 max-xl:w-[95%] mx-auto'>
        <CardHeader className='p-0 m-0 gap-0' />

        <CardContent>
          <div className='flex flex-col gap-5 w-full'>
            <div className='grid grid-row-start:auto gap-4 sm:gap-8'>
              <div className='h-full mt-0 ml-2 mb-16 flex items-center justify-between max-sm:grid max-sm:grid-row-start:auto max-sm:mb-6 max-sm:mt-10 max-sm:ml-0'>
                <div className='w-[100px] max-sm:w-full max-sm:flex max-sm:justify-center'>
                  <Logo colorType='monochrome' logoType='submark' width={50} />
                </div>
                <div className='items-center ml-auto mr-auto max-sm:mb-6 max-sm:w-full max-sm:flex max-sm:justify-center'>
                  <h1 className='text-center'>
                    {eventData.data.event.title || 'Untitled Event'}
                  </h1>
                </div>
                <div className='w-0 sm:w-[100px]'></div>
              </div>
              <div className='grid grid-cols-4 gap-4 h-full w-full max-lg:grid-cols-2 max-sm:grid-cols-1'>
                <div>
                  <Label className='text-[var(--color-neutral-300)] mb-2'>
                    start Time
                  </Label>
                  <Label size='large'>
                    {eventData.data.event.start_time
                      ? `${formatDate(eventData.data.event.start_time)} ${formatTime(eventData.data.event.start_time)}`
                      : '-'}
                  </Label>
                </div>
                <div>
                  <Label className='text-[var(--color-neutral-300)] mb-2'>
                    end Time
                  </Label>
                  <Label size='large'>
                    {eventData.data.event.end_time
                      ? `${formatDate(eventData.data.event.end_time)} ${formatTime(eventData.data.event.end_time)}`
                      : '-'}
                  </Label>
                </div>
                <div className='w-54'>
                  <Label className='text-[var(--color-neutral-300)] mb-2'>
                    Location
                  </Label>
                  <Label size='large'>{eventData.data.event.location || '-'}</Label>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-row gap-2'>
                    <Label className='w-[70px] text-[var(--color-neutral-300)]'>
                      created:
                    </Label>
                    <Label>
                      {eventData.data.event.created_at ? formatDate(eventData.data.event.created_at) : '-'}
                    </Label>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <Label className='w-[70px] text-[var(--color-neutral-300)]'>
                      updated:
                    </Label>
                    <Label>
                      {eventData.data.event.updated_at ? formatDate(eventData.data.event.updated_at) : '-'}
                    </Label>
                  </div>
                </div>
              </div>
              <div className='h-full w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
                <div className='h-full w-full grid grid-flow-row gap-4 sm:gap-8'>
                  <div className='h-full w-full'>
                    <div className='flex flex-row gap-2'>
                      <Label className='text-[var(--color-neutral-300)]'>
                        Organiser:
                      </Label>
                      <Label size='large'>{userData?.data.user?.name || 'Unknown User'}</Label>
                    </div>
                  </div>
                  <div className='h-full w-full'>
                    <Label className='text-[var(--color-neutral-300)] mb-2'>
                      Description
                    </Label>
                    <Label size='large'>{eventData.data.event.description || '-'}</Label>
                  </div>
                </div>
                <div className='h-full w-full mt-2'>
                  <Label className='text-[var(--color-neutral-300)] mb-2'>
                    Participants
                  </Label>{' '}
                  <div className='grid grid-cols-1 mt-3 sm:max-h-60 sm:grid-cols-2  sm:overflow-y-auto sm:mb-0'>
                    {eventData.data.event.participants?.map((user) => (
                      <ParticipantListEntry
                        key={user.user.id}
                        {...user}
                        eventID={eventData.data.event.id}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-2 justify-end mt-4 mb-6'>
                <div className='w-[20%] grid max-sm:w-full'>
                  {session.data?.user?.id === eventData.data.event.organizer.id ? (
                    <Dialog
                      open={deleteDialogOpen}
                      onOpenChange={setDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant='destructive' className='w-full'>
                          delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Event</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete the event &ldquo;
                            {eventData.data.event.title}&rdquo;? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant='secondary'
                            onClick={() => setDeleteDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant='muted'
                            onClick={() => {
                              deleteEvent.mutate(
                                { eventID: eventData.data.event.id },
                                {
                                  onSuccess: () => {
                                    router.push('/home');
                                    toast.custom((t) => (
                                      <ToastInner
                                        toastId={t}
                                        title='Event deleted'
                                        description={eventData.data.event.title}
                                        variant='success'
                                      />
                                    ));
                                  },
                                },
                              );
                              setDeleteDialogOpen(false);
                            }}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : null}
                </div>
                <div className='w-[20%] grid max-sm:w-full'>
                  {session.data?.user?.id === eventData.data.event.organizer.id ? (
                    <RedirectButton
                      redirectUrl={`/events/edit/${eventID}`}
                      buttonText='edit'
                      className='w-full'
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
