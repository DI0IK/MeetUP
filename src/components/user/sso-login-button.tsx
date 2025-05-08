import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
//import { faOpenid } from '@fortawesome/free-brands-svg-icons';

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
        className='w-full'
        type='submit'
        variant='default' /*icon={faOpenid}*/
      >
        Login with {providerDisplayName}
      </Button>
    </form>
  );
}
