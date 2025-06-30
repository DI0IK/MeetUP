import bcrypt from 'bcryptjs';

import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';

import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

import { auth } from '@/auth';
import { prisma } from '@/prisma';

import { FullUserResponseSchema } from '../../validation';
import { updateUserPasswordServerSchema } from '../validation';

export const PATCH = auth(async function PATCH(req) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const body = await req.json();
  const parsedBody = updateUserPasswordServerSchema.safeParse(body);
  if (!parsedBody.success)
    return returnZodTypeCheckedResponse(
      ZodErrorResponseSchema,
      {
        success: false,
        message: 'Invalid request data',
        errors: parsedBody.error.issues,
      },
      { status: 400 },
    );

  const { current_password, new_password } = parsedBody.data;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: authCheck.user.id,
    },
    include: {
      accounts: true,
    },
  });

  if (!dbUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User not found',
      },
      { status: 404 },
    );

  if (!dbUser.password_hash)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User does not have a password set',
      },
      { status: 400 },
    );

  if (
    dbUser.accounts.length === 0 ||
    dbUser.accounts[0].provider !== 'credentials'
  )
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'Credentials login is not enabled for this user',
      },
      { status: 400 },
    );

  const isCurrentPasswordValid = await bcrypt.compare(
    current_password,
    dbUser.password_hash || '',
  );

  if (!isCurrentPasswordValid)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'Current password is incorrect',
      },
      { status: 401 },
    );

  const hashedNewPassword = await bcrypt.hash(new_password, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      password_hash: hashedNewPassword,
    },
    select: {
      id: true,
      name: true,
      first_name: true,
      last_name: true,
      email: true,
      image: true,
      timezone: true,
      created_at: true,
      updated_at: true,
    },
  });

  return returnZodTypeCheckedResponse(FullUserResponseSchema, {
    success: true,
    user: updatedUser,
  });
});
