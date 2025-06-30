'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import LabeledInput from '@/components/custom-ui/labeled-input';
import { Button } from '@/components/ui/button';

import { loginAction } from '@/lib/auth/login';
import { registerAction } from '@/lib/auth/register';
import { loginSchema, registerSchema } from '@/lib/auth/validation';
import useZodForm from '@/lib/hooks/useZodForm';

function LoginFormElement({
  setIsSignUp,
  formRef,
}: {
  setIsSignUp: (value: boolean | ((prev: boolean) => boolean)) => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
}) {
  const { handleSubmit, formState, register, setError } =
    useZodForm(loginSchema);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { error } = await loginAction(data);

      if (error) {
        setError('root', {
          message: error,
        });
        return;
      } else {
        router.push('/home');
        router.refresh();
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        setError('root', {
          message: error?.message,
        });
      else
        setError('root', {
          message: 'An unknown error occurred.',
        });
    }
  });

  return (
    <form
      className='flex flex-col gap-5 w-full'
      onSubmit={onSubmit}
      data-cy='login-form'
    >
      <LabeledInput
        type='text'
        label='E-Mail or Username'
        placeholder='What you are known as'
        error={formState.errors.email?.message}
        {...register('email')}
        data-cy='email-input'
      />
      <LabeledInput
        type='password'
        label='Password'
        placeholder="Let's hope you remember it"
        error={formState.errors.password?.message}
        {...register('password')}
        data-cy='password-input'
      />
      <div className='grid grid-rows-2 gap-2'>
        <Button type='submit' variant='primary' data-cy='login-button'>
          Login
        </Button>
        <Button
          type='button'
          variant='outline_primary'
          onClick={() => {
            formRef?.current?.reset();
            setIsSignUp((v) => !v);
          }}
          data-cy='register-switch'
        >
          Sign Up
        </Button>
      </div>
      <div>
        {formState.errors.root?.message && (
          <p className='text-red-500'>{formState.errors.root?.message}</p>
        )}
      </div>
    </form>
  );
}

function RegisterFormElement({
  setIsSignUp,
  formRef,
}: {
  setIsSignUp: (value: boolean | ((prev: boolean) => boolean)) => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
}) {
  const { handleSubmit, formState, register, setError } =
    useZodForm(registerSchema);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { error } = await registerAction(data);

      if (error) {
        setError('root', {
          message: error,
        });
        return;
      } else {
        formRef?.current?.reset();
        setIsSignUp(false);
        // TODO: Show registration success message (reminder to verify email)
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        setError('root', {
          message: error?.message,
        });
      else
        setError('root', {
          message: 'An unknown error occurred.',
        });
    }
  });

  return (
    <form
      ref={formRef}
      className='flex flex-col gap-5 w-full'
      onSubmit={onSubmit}
      data-cy='register-form'
    >
      <LabeledInput
        type='text'
        label='First Name'
        placeholder='Your first name'
        autocomplete='given-name'
        error={formState.errors.firstName?.message}
        {...register('firstName')}
        data-cy='first-name-input'
      />
      <LabeledInput
        type='text'
        label='Last Name'
        placeholder='Your last name'
        autocomplete='family-name'
        error={formState.errors.lastName?.message}
        {...register('lastName')}
        data-cy='last-name-input'
      />
      <LabeledInput
        type='email'
        label='E-Mail'
        placeholder='Your email address'
        autocomplete='email'
        error={formState.errors.email?.message}
        {...register('email')}
        data-cy='email-input'
      />
      <LabeledInput
        type='text'
        label='Username'
        placeholder='Your username'
        autocomplete='username'
        error={formState.errors.username?.message}
        {...register('username')}
        data-cy='username-input'
      />
      <LabeledInput
        type='password'
        label='Password'
        placeholder='Create a password'
        autocomplete='new-password'
        error={formState.errors.password?.message}
        {...register('password')}
        data-cy='password-input'
      />
      <LabeledInput
        type='password'
        label='Confirm Password'
        placeholder='Repeat your password'
        autocomplete='new-password'
        error={formState.errors.confirmPassword?.message}
        {...register('confirmPassword')}
        data-cy='confirm-password-input'
      />
      <div className='grid grid-rows-2 gap-2'>
        <Button type='submit' variant='primary' data-cy='register-button'>
          Sign Up
        </Button>
        <Button
          type='button'
          variant='outline_primary'
          onClick={() => {
            formRef?.current?.reset();
            setIsSignUp((v) => !v);
          }}
        >
          Back to Login
        </Button>
      </div>
      <div>
        {formState.errors.root?.message && (
          <p className='text-red-500'>{formState.errors.root?.message}</p>
        )}
      </div>
    </form>
  );
}

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  if (isSignUp) {
    return <RegisterFormElement setIsSignUp={setIsSignUp} formRef={formRef} />;
  }
  return <LoginFormElement setIsSignUp={setIsSignUp} formRef={formRef} />;
}
