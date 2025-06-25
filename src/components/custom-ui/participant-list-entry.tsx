import React from 'react';
import Image from 'next/image';
import { user_default_dark } from '@/assets/usericon/default/defaultusericon-export';
import { user_default_light } from '@/assets/usericon/default/defaultusericon-export';
import { useTheme } from 'next-themes';

type ParticipantListEntryProps = {
  participant: string;
  imageSrc?: string | null;
};

export default function ParticipantListEntry({
  participant,
  imageSrc,
}: ParticipantListEntryProps) {
  const { resolvedTheme } = useTheme();
  const defaultImage =
    resolvedTheme === 'dark' ? user_default_dark : user_default_light;

  const finalImageSrc = imageSrc ?? defaultImage;

  return (
    <div className='flex items-center gap-2 py-1 ml-5'>
      <Image src={finalImageSrc} alt='Avatar' width={30} height={30} />
      <span>{participant}</span>
    </div>
  );
}
