import { auth } from '@/auth';
import SSOLogin from '@/components/user/sso-login-button';
import LoginForm from '@/components/user/login-form';
import { redirect } from 'next/navigation';

import style from './login.module.css';

import '@/app/globals.css';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <div className={style.loginContainer}>
      <h1>Login</h1>

      <LoginForm></LoginForm>

      <hr style={{ width: 230 }} />

      {process.env.AUTH_AUTHENTIK_ISSUER && (
        <SSOLogin provider='authentik' providerDisplayName='SSO' />
      )}
    </div>
  );
}
