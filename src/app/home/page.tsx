import { RedirectButton } from '@/components/buttons/redirect-button';
import { ThemePicker } from '@/components/misc/theme-picker';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='absolute top-4 right-4'>{<ThemePicker />}</div>
      <div>
        <h1>Home</h1>
        <RedirectButton redirectUrl='/logout' buttonText='Logout' />
        <RedirectButton redirectUrl='/settings' buttonText='Settings' />
      </div>
    </div>
  );
}
