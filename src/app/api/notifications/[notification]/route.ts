import { auth } from '@/auth';
import { prisma } from '@/prisma';
import {
  getNotificationResponseSchema,
  updateNotificationRequestSchema,
} from '../validation';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

export const PATCH = auth(async function GET(req, { params }: { params: Promise<{ notification: string }> }) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const userId = authCheck.user.id;

  const notificationId = (await params).notification;

  const dataRaw = await req.json();
  const data = await updateNotificationRequestSchema.safeParseAsync(dataRaw);
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
  const { is_read } = data.data;

  const notification = await prisma.notification.update({
    where: {
      id: notificationId,
      user_id: userId,
    },
    data: {
      is_read,
    },
    select: {
      id: true,
      type: true,
      related_entity_id: true,
      related_entity_type: true,
      message: true,
      is_read: true,
      created_at: true,
    },
  });

  if (!notification)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Notification not found or you do not have permission to update it' },
      { status: 404 },
    );

  return returnZodTypeCheckedResponse(
    getNotificationResponseSchema,
    {
      success: true,
      notification,
    },
    { status: 200 },
  );
});