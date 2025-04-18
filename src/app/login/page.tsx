import { auth } from '@/auth';
import Login from '@/components/user/login-button';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div>
      <h1>Login</h1>
      <Login provider='authentik' providerDisplayName='SSO' />
    </div>
  );
}
