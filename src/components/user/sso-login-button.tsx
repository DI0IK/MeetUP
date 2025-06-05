import { signIn } from '@/auth';
import { IconButton } from '@/components/icon-button';
import { faOpenid } from '@fortawesome/free-brands-svg-icons';

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
      <IconButton
        className='w-full'
        type='submit'
        variant='secondary'
        icon={faOpenid}
      >
        Login with {providerDisplayName}
      </IconButton>
    </form>
  );
}
