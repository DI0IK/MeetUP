'use client';

import { RedirectButton } from '@/components/buttons/redirect-button';
import { useGetApiUserMe } from '@/generated/api/user/user';

export default function Home() {
  const { data, isLoading } = useGetApiUserMe();

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div>
        <h1>
          Hello{' '}
          {isLoading ? 'Loading...' : data?.data.user?.name || 'Unknown User'}
        </h1>
        <RedirectButton redirectUrl='/logout' buttonText='Logout' />
        <RedirectButton redirectUrl='/settings' buttonText='Settings' />
      </div>
    </div>
  );
}
