import { auth, providerMap } from '@/auth';
import SSOLogin from '@/components/user/sso-login-button';
import LoginForm from '@/components/user/login-form';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import '@/app/globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemePicker } from '@/components/user/theme-picker';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='absolute top-4 right-4'>
          <ThemePicker />
        </div>
        <div>
          <Card className='w-[350px] max-w-screen'>
            <CardHeader>
              <CardTitle className='text-lg text-center'>Login</CardTitle>
            </CardHeader>
            <CardContent className='gap-6 flex flex-col'>
              <LoginForm />

              {providerMap.length > 0 && <hr />}

              {providerMap.map((provider) => (
                <SSOLogin
                  key={provider.id}
                  provider={provider.id}
                  providerDisplayName={provider.name}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <HoverCard>
        <HoverCardTrigger className='text-sm text-muted-foreground hover:underline'>
          <Button variant='link'>made with love</Button>
        </HoverCardTrigger>
        <HoverCardContent className='flex items-center justify-center'>
          <Image
            src='https://img1.wikia.nocookie.net/__cb20140808110649/clubpenguin/images/a/a1/Action_Dance_Light_Blue.gif'
            width='150'
            height='150'
            alt='dancing penguin'
          ></Image>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
