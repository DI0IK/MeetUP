'use client';

import Calendar from '@/components/calendar';
import { useGetApiUserMe } from '@/generated/api/user/user';

export default function Home() {
  const { data } = useGetApiUserMe();

  return (
    <div className='max-h-full'>
      <Calendar
        userId={data?.data.user?.id}
        height='calc(100svh - 50px - (var(--spacing) * 2 * 5))'
      />
    </div>
  );
}
