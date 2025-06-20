import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { updateUserServerSchema } from './validation';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
import { FullUserResponseSchema } from '../validation';
import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

export const GET = auth(async function GET(req) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const dbUser = await prisma.user.findUnique({
    where: {
      id: authCheck.user.id,
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
  if (!dbUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User not found',
      },
      { status: 404 },
    );

  return returnZodTypeCheckedResponse(FullUserResponseSchema, {
    success: true,
    user: dbUser,
  });
});

export const PATCH = auth(async function PATCH(req) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const dataRaw = await req.json();
  const data = await updateUserServerSchema.safeParseAsync(dataRaw);
  if (!data.success) {
    return returnZodTypeCheckedResponse(
      ZodErrorResponseSchema,
      {
        success: false,
        message: 'Invalid request data',
        errors: data.error.issues,
      },
      { status: 400 },
    );
  }
  if (Object.keys(data.data).length === 0) {
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'No data to update' },
      { status: 400 },
    );
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: authCheck.user.id,
    },
    data: data.data,
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
  if (!updatedUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User not found',
      },
      { status: 404 },
    );
  return returnZodTypeCheckedResponse(
    FullUserResponseSchema,
    {
      success: true,
      user: updatedUser,
    },
    { status: 200 },
  );
});
