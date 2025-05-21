import { signIn } from '@/auth';
import LabeledInput from '@/components/labeled-input';
import { Button } from '@/components/custom-ui/button';
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
        label='E-Mail or Username'
        placeholder='What you are known as.'
        name='email'
      />
      <LabeledInput
        type='password'
        label='Password'
        placeholder="Let's hope you remember it."
        name='password'
      />
      <div className='grid grid-rows-2 gap-2'>
        <Button type='submit' variant='primary'>
          Login
        </Button>
        <Button type='submit' variant='outline'>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
