import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { searchUserSchema, searchUserResponseSchema } from './validation';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
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

  const dataRaw = Object.fromEntries(req.nextUrl.searchParams);
  const data = await searchUserSchema.safeParseAsync(dataRaw);
  if (!data.success)
    return returnZodTypeCheckedResponse(
      ZodErrorResponseSchema,
      {
        success: false,
        message: 'Invalid request data',
        errors: data.error.issues,
      },
      { status: 400 },
    );
  const { query, count, page, sort_by, sort_order } = data.data;

  const dbUsers = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { first_name: { contains: query } },
        { last_name: { contains: query } },
      ],
    },
    orderBy: {
      [sort_by]: sort_order,
    },
    skip: (page - 1) * count,
    take: count,
    select: {
      id: true,
      name: true,
      first_name: true,
      last_name: true,
      timezone: true,
      image: true,
    },
  });

  const userCount = await prisma.user.count({
    where: {
      OR: [
        { name: { contains: query } },
        { first_name: { contains: query } },
        { last_name: { contains: query } },
      ],
    },
  });

  return returnZodTypeCheckedResponse(
    searchUserResponseSchema,
    {
      success: true,
      users: dbUsers,
      total_count: userCount,
      total_pages: Math.ceil(userCount / count),
    },
    { status: 200 },
  );
});
