'use client';
import { signIn } from '@/auth';
import LabeledInput from '@/components/labeled-input';
import { Button } from '@/components/custom-ui/button';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const SIGNIN_ERROR_URL = '/error';

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <form
      className='flex flex-col gap-5 w-full'
      action={async (formData) => {
        'use client';
        try {
          if (isSignUp) {
            // handle sign up logic here
          } else {
            await signIn('credentials', formData);
          }
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
          }
          throw error;
        }
      }}
    >
      {isSignUp ? (
        <>
          <LabeledInput
            type='text'
            label='First Name'
            placeholder='Your first name'
            name='firstName'
            autocomplete='given-name'
          />
          <LabeledInput
            type='text'
            label='Last Name'
            placeholder='Your last name'
            name='lastName'
            autocomplete='family-name'
          />
          <LabeledInput
            type='email'
            label='E-Mail'
            placeholder='Your email address'
            name='email'
            autocomplete='email'
          />
          <LabeledInput
            type='password'
            label='Password'
            placeholder='Create a password'
            name='password'
            autocomplete='new-password'
          />
          <LabeledInput
            type='password'
            label='Confirm Password'
            placeholder='Repeat your password'
            name='confirmPassword'
            autocomplete='new-password'
          />
        </>
      ) : (
        <>
          <LabeledInput
            type='email'
            label='E-Mail or Username'
            placeholder='What you are known as'
            name='email'
          />
          <LabeledInput
            type='password'
            label='Password'
            placeholder="Let's hope you remember it"
            name='password'
          />
        </>
      )}
      <div className='grid grid-rows-2 gap-2'>
        <Button type='submit' variant='primary'>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
        <Button
          type='button'
          variant='outline_primary'
          onClick={() => setIsSignUp((v) => !v)}
        >
          {isSignUp ? 'Back to Login' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
}
