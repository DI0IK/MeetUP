import { signOut } from '@/auth';
import { Button } from '@/components/custom-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignOutPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <Card className='w-[350px] max-w-screen'>
          <CardHeader>
            <CardTitle className='text-lg text-center'>Logout</CardTitle>
            <CardDescription className='text-center'>
              Are you sure you want to log out?
            </CardDescription>
          </CardHeader>
          <CardContent className='gap-6 flex flex-col'>
            <Button type='submit' variant='secondary'>
              Logout
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
