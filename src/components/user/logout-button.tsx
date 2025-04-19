import { signOut } from '@/auth';
import Button from '../button';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

export function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <Button type='submit' mode='primary' icon={faDoorOpen}>
        Sign Out
      </Button>
    </form>
  );
}
