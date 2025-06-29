import React from 'react';
import Image from 'next/image';
import { user_default_dark } from '@/assets/usericon/default/defaultusericon-export';
import { user_default_light } from '@/assets/usericon/default/defaultusericon-export';
import { useTheme } from 'next-themes';
import zod from 'zod/v4';
import { ParticipantSchema } from '@/app/api/event/[eventID]/participant/validation';

type ParticipantListEntryProps = zod.output<typeof ParticipantSchema>;

export default function ParticipantListEntry({
  user,
  status,
}: ParticipantListEntryProps) {
  const { resolvedTheme } = useTheme();
  const defaultImage =
    resolvedTheme === 'dark' ? user_default_dark : user_default_light;

  const finalImageSrc = user.image ?? defaultImage;

  return (
    <div className='flex items-center gap-2 py-1 ml-5'>
      <Image src={finalImageSrc} alt='Avatar' width={30} height={30} />
      <span>{user.name}</span>
      <span className='text-sm text-gray-500'>{status}</span>
    </div>
  );
}
