import Image from 'next/image';
import { redirect } from 'next/navigation';

import SSOLogin from '@/components/buttons/sso-login-button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/custom-ui/login-card';
import LoginForm from '@/components/forms/login-form';
import Logo from '@/components/misc/logo';
import { ThemePicker } from '@/components/misc/theme-picker';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';

import { auth, providerMap } from '@/auth';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <div className='flex flex-col items-center max-h-screen overflow-y-auto'>
      <div className='flex flex-col items-center min-h-screen'>
        <div className='fixed top-4 right-4'>
          <ThemePicker />
        </div>
        <div className='mt-auto mb-auto'>
          <Card className='w-[350px] max-w-screen;'>
            <CardHeader
              className='grid place-items-center'
              data-cy='login-header'
            >
              <Logo colorType='colored' logoType='secondary'></Logo>
            </CardHeader>
            <CardContent className='gap-6 flex flex-col items-center'>
              <LoginForm />

              <Separator className='h-[1px] rounded-sm w-[60%] bg-border' />

              {providerMap.map((provider) => (
                <SSOLogin
                  key={provider.id}
                  provider={provider.id}
                  providerDisplayName={provider.name}
                  data-cy={'sso-login-button_' + provider.name.toLowerCase()}
                />
              ))}
            </CardContent>
          </Card>
        </div>
        <HoverCard>
          <HoverCardTrigger>
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
    </div>
  );
}
