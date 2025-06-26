import { auth } from '@/auth';
import { prisma } from '@/prisma';
import {
  getNotificationsRequestSchema,
  getNotificationsResponseSchema,
} from './validation';
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

  const userId = authCheck.user.id;

  const dataRaw = Object.fromEntries(new URL(req.url).searchParams);
  const data = await getNotificationsRequestSchema.safeParseAsync(dataRaw);
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
  const { skip, all } = data.data;

  const notifications = await prisma.notification.findMany({
    where: {
      user_id: userId,
      created_at: all
        ? undefined
        : { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    },
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      type: true,
      related_entity_id: true,
      related_entity_type: true,
      message: true,
      is_read: true,
      created_at: true,
    },
    take: 50,
    skip,
  });

  const total_count = await prisma.notification.count({
    where: { user_id: userId },
  });

  const unread_count = await prisma.notification.count({
    where: { user_id: userId, is_read: false },
  });

  return returnZodTypeCheckedResponse(
    getNotificationsResponseSchema,
    {
      success: true,
      notifications,
      total_count,
      unread_count,
    },
    { status: 200 },
  );
});
