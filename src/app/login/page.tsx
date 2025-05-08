import { auth } from '@/auth';
import SSOLogin from '@/components/user/sso-login-button';
import LoginForm from '@/components/user/login-form';
import { redirect } from 'next/navigation';

import '@/app/globals.css';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center w-full max-w-sm p-15 gap-10 bg-white border border-gray-300 rounded-lg shadow-md'>
        <h1>Login</h1>

        <LoginForm></LoginForm>

        <hr style={{ width: 230 }} />

        {process.env.AUTH_AUTHENTIK_ISSUER && (
          <SSOLogin provider='authentik' providerDisplayName='SSO' />
        )}
      </div>
    </div>
  );
}
