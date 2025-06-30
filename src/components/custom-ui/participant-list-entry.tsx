import React from 'react';
import Image from 'next/image';
import { user_default_dark } from '@/assets/usericon/default/defaultusericon-export';
import { user_default_light } from '@/assets/usericon/default/defaultusericon-export';
import { useTheme } from 'next-themes';
import zod from 'zod/v4';
import { ParticipantSchema } from '@/app/api/event/[eventID]/participant/validation';
import { usePatchApiEventEventIDParticipantUser } from '@/generated/api/event-participant/event-participant';
import { useSession } from 'next-auth/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type ParticipantListEntryProps = zod.output<typeof ParticipantSchema>;

export default function ParticipantListEntry({
  user,
  status,
  eventID,
}: ParticipantListEntryProps & { eventID?: string }) {
  const session = useSession();
  const { resolvedTheme } = useTheme();
  const defaultImage =
    resolvedTheme === 'dark' ? user_default_dark : user_default_light;
  const updateAttendance = usePatchApiEventEventIDParticipantUser();

  const finalImageSrc = user.image ?? defaultImage;

  return (
    <div className='flex items-center gap-2 py-1 ml-5'>
      <Image src={finalImageSrc} alt='Avatar' width={30} height={30} />
      <span>{user.name}</span>
      {user.id === session.data?.user?.id && eventID ? (
        <Select
          defaultValue={status}
          onValueChange={(value) => {
            updateAttendance.mutate({
              eventID: eventID,
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
      ) : (
        <span className='text-sm text-gray-500'>{status}</span>
      )}
    </div>
  );
}
