import { auth } from '@/auth';
import SSOLogin from '@/components/user/sso-login-button';
import LoginForm from '@/components/user/login-form';
import { redirect } from 'next/navigation';

import '@/app/globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Card className='w-[350px] max-w-screen'>
        <CardHeader>
          <CardTitle className='text-lg text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent className='gap-6 flex flex-col'>
          <LoginForm />

          <hr />

          {process.env.AUTH_AUTHENTIK_ISSUER && (
            <SSOLogin provider='authentik' providerDisplayName='SSO' />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
