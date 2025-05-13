import { signIn } from '@/auth';
import LabeledInput from '@/components/labeled-input';
import { Button } from '@/components/ui/button';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

const SIGNIN_ERROR_URL = '/error';

export default function LoginForm() {
  return (
    <form
      className='flex flex-col gap-5 w-full'
      action={async (formData) => {
        'use server';
        try {
          await signIn('credentials', formData);
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
          }
          throw error;
        }
      }}
    >
      <LabeledInput
        type='email'
        label='E-Mail'
        placeholder='Enter your E-Mail'
        name='email'
      />
      <LabeledInput
        type='password'
        label='Password'
        placeholder='Enter your Password'
        name='password'
      />
      <Button
        className='hover:bg-blue-600 hover:text-white'
        type='submit'
        variant='secondary'
      >
        Login
      </Button>
    </form>
  );
}
