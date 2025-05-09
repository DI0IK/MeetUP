import { signOut } from '@/auth';
import { IconButton } from '@/components/icon-button';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

export function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <IconButton type='submit' variant='destructive' icon={faDoorOpen}>
        Sign Out
      </IconButton>
    </form>
  );
}
