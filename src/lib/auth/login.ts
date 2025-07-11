'use server';

import { z } from 'zod/v4';
import { loginSchema } from './validation';
import { signIn } from '@/auth';

export async function loginAction(data: z.infer<typeof loginSchema>) {
  try {
    await signIn('credentials', {
      ...data,
      redirect: false,
    });

    return {
      error: undefined,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message.toString(),
      };
    }
    return {
      error: 'An unknown error occurred.',
    };
  }
}
