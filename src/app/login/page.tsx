import { auth, providerMap } from '@/auth';
import SSOLogin from '@/components/buttons/sso-login-button';
import LoginForm from '@/components/forms/login-form';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/misc/logo';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/custom-ui/login-card';
import { ThemePicker } from '@/components/misc/theme-picker';
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

              {providerMap.length > 0 && !process.env.DISABLE_PASSWORD_LOGIN ? (
                <Separator className='h-[1px] rounded-sm w-[60%] bg-border' />
              ) : null}

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
              src='https://i.gifer.com/22CU.gif'
              width='150'
              height='150'
              alt='cat gif'
              unoptimized
            ></Image>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
