import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';

export default function SSOLogin({
  provider,
  providerDisplayName,
}: {
  provider: string;
  providerDisplayName: string;
}) {
  return (
    <form
      className='flex flex-col items-center gap-4 w-full'
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <Button
        className='w-full flex items-center'
        type='submit'
        variant='default'
      >
        <div className='flex justify-center'>
          <Fingerprint />
        </div>

        <div className='flex justify-center'>
          Login with {providerDisplayName}
        </div>
      </Button>
    </form>
  );
}
