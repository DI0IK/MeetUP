import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
//import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

export function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <Button type='submit' variant='destructive' /*icon={faDoorOpen}*/>
        Sign Out
      </Button>
    </form>
  );
}
