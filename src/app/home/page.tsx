import { Logout } from '@/components/user/sso-logout-button';
import { ThemePicker } from '@/components/user/theme-picker';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='absolute top-4 right-4'>{<ThemePicker />}</div>
      <div>
        <h1>Home</h1>
        <Logout />
      </div>
    </div>
  );
}
