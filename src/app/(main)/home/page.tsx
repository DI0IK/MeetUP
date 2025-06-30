'use client';

import Calendar from '@/components/calendar';
import { useGetApiUserMe } from '@/generated/api/user/user';

export default function Home() {
  const { data, isLoading } = useGetApiUserMe();

  return (
    <div className='grid grid-cols-1 w-full place-items-center'>
      <div className='w-full sm:w-[90%] mb-4'>
        <h1 className='text-2xl font-bold text-center'>
          Welcome, <wbr />
          <span style={{ whiteSpace: 'nowrap' }}>
            {isLoading
              ? 'Loading...'
              : data?.data.user?.first_name ||
                data?.data.user?.name ||
                'Unknown User'}{' '}
            &#128075;
          </span>
        </h1>
      </div>
      <div className='w-full sm:w-[90%]'>
        <Calendar
          userId={data?.data.user?.id}
          height='calc(100svh - 115px - (var(--spacing) * 2 * 5))'
        />
      </div>
    </div>
  );
}
