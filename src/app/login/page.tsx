// /home/max/Git/MeetUp/src/app/login/page.tsx
import { auth } from '@/auth';
import LabeledInput from '@/components/labeled-input';
import SSOLogin from '@/components/user/sso-login-button';
import Login from '@/components/user/login-button';
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

      <form>
        <LabeledInput
          type='email'
          label='E-Mail'
          placeholder='Enter your E-Mail'
        />
        <LabeledInput
          type='password'
          label='Password'
          placeholder='Enter your Password'
        />
      </form>

      <Login></Login>

      <hr style={{ width: 230 }} />

      {process.env.AUTH_AUTHENTIK_ISSUER && (
        <SSOLogin provider='authentik' providerDisplayName='SSO' />
      )}
      {process.env.AUTH_AUTHENTIK_ISSUER && (
        <SSOLogin provider='authentik' providerDisplayName='SSO' />
      )}
    </div>
  );
}
