// /home/max/Git/MeetUp/src/app/login/page.tsx
import { auth } from '@/auth';
import LabeledInput from '@/components/labeled-input';
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

      <LabeledInput
        type='email'
        size='login'
        label='E-Mail'
        placeholder='Enter your E-Mail'
      />
      <LabeledInput
        type='password'
        size='login'
        label='Password'
        placeholder='Enter your Password'
      />
      <Login provider='authentik' providerDisplayName='SSO' />
    </div>
  );
}
