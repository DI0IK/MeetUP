import { faOpenid } from '@fortawesome/free-brands-svg-icons';

import { IconButton } from '@/components/buttons/icon-button';

import { signIn } from '@/auth';

export default function SSOLogin({
  provider,
  providerDisplayName,
  ...props
}: {
  provider: string;
  providerDisplayName: string;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <form
      className='flex flex-col items-center w-full'
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
        {...props}
      >
        Login with {providerDisplayName}
      </IconButton>
    </form>
  );
}
