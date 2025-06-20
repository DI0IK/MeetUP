'use client';

import { RedirectButton } from '@/components/buttons/redirect-button';
import { ThemePicker } from '@/components/misc/theme-picker';
import { useGetApiUserMe } from '@/generated/api/user/user';

export default function Home() {
  const { data, isLoading } = useGetApiUserMe();

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='absolute top-4 right-4'>{<ThemePicker />}</div>
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
