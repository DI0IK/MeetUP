import { signOut } from '@/auth';
import Button from '../Button';

export function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type='submit'>Sign Out</Button>
    </form>
  );
}
