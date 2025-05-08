import { signIn } from '@/auth';
import Button from '../button';
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
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <Button type='submit' mode='warning' icon={faOpenid} width={250}>
        Login with {providerDisplayName}
      </Button>
    </form>
  );
}
