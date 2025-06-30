import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';

import { ErrorResponseSchema } from '@/app/api/validation';

import { auth } from '@/auth';
import { prisma } from '@/prisma';

import { PublicUserResponseSchema } from '../validation';

export const GET = auth(async function GET(req, { params }) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const requestedUser = (await params).user;
  const dbUser = await prisma.user.findFirst({
    where: {
      OR: [{ id: requestedUser }, { name: requestedUser }],
    },
    select: {
      id: true,
      name: true,
      first_name: true,
      last_name: true,
      email: true,
      created_at: true,
      updated_at: true,
      image: true,
      timezone: true,
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

  return returnZodTypeCheckedResponse(
    PublicUserResponseSchema,
    {
      success: true,
      user: dbUser,
    },
    { status: 200 },
  );
});
