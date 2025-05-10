import { RedirectButton } from '@/components/user/redirect-button';

export default function Home() {
  return (
    <div>
      <h1>Settings</h1>
      <RedirectButton redirectUrl='/home' buttonText='Home' />
    </div>
  );
}
