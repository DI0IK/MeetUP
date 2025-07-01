'use client';

import { Card } from '@/components/ui/card';
import Logo from '@/components/misc/logo';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import zod from 'zod/v4';
import { EventSchema } from '@/app/api/event/validation';
import { useSession } from 'next-auth/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { usePatchApiEventEventIDParticipantUser } from '@/generated/api/event-participant/event-participant';

type EventListEntryProps = zod.output<typeof EventSchema>;

export default function EventListEntry({
  title,
  id,
  start_time,
  end_time,
  location,
  participants,
}: EventListEntryProps) {
  const session = useSession();
  const updateAttendance = usePatchApiEventEventIDParticipantUser();

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
    <Link href={`/events/${id}`} className='block'>
      <Card className='w-full'>
        <div
          className='grid grid-cols-1 gap-2 mx-auto md:mx-4 md:grid-cols-[80px_1fr_250px]'
          data-cy='event-list-entry'
        >
          <div className='w-full items-center justify-center grid'>
            <Logo colorType='monochrome' logoType='submark' width={50} />
          </div>
          <div className='w-full items-center justify-center grid my-3 md:my-0'>
            <h2 className='text-center'>{title}</h2>
          </div>
          <div className='grid gap-4'>
            <div className='grid grid-cols-[80px_auto] gap-2'>
              <Label className='text-[var(--color-neutral-300)] justify-end'>
                start
              </Label>
              <Label>
                {formatDate(start_time)} {formatTime(start_time)}
              </Label>
            </div>
            <div className='grid grid-cols-[80px_auto] gap-2'>
              <Label className='text-[var(--color-neutral-300)] justify-end'>
                end
              </Label>
              <Label>
                {formatDate(end_time)} {formatTime(end_time)}
              </Label>
            </div>
            {location && (
              <div className='grid grid-cols-[80px_auto] gap-2'>
                <Label className='text-[var(--color-neutral-300)] justify-end'>
                  location
                </Label>
                <Label>{location}</Label>
              </div>
            )}
            {participants &&
              participants.some(
                (p) => p.user.id === session.data?.user?.id,
              ) && (
                <div className='flex items-center justify-end'>
                  <Select
                    defaultValue={
                      participants
                        .find((p) => p.user.id === session.data?.user?.id)
                        ?.status.toUpperCase() || 'PENDING'
                    }
                    onValueChange={(value) => {
                      updateAttendance.mutate({
                        eventID: id,
                        user: session.data?.user?.id || '',
                        data: {
                          status: value as
                            | 'ACCEPTED'
                            | 'TENTATIVE'
                            | 'DECLINED'
                            | 'PENDING',
                        },
                      });
                    }}
                  >
                    <SelectTrigger id='language'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='ACCEPTED'>Attending</SelectItem>
                      <SelectItem value='TENTATIVE'>Maybe Attending</SelectItem>
                      <SelectItem value='DECLINED'>Not Attending</SelectItem>
                      <SelectItem value='PENDING' disabled>
                        Pending Response
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
