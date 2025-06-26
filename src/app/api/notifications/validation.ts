import zod from 'zod/v4';

export const notificationsSchema = zod.object({
  id: zod.string(),
  type: zod.enum([
    'FRIEND_REQUEST',
    'FRIEND_ACCEPT',
    'MEETING_INVITE',
    'MEETING_UPDATE',
    'MEETING_CANCEL',
    'MEETING_REMINDER',
    'GROUP_MEMBER_ADDED',
    'CALENDAR_SYNC_ERROR',
  ]),
  related_entity_id: zod.string().nullable(),
  related_entity_type: zod.enum(['USER', 'MEETING', 'GROUP']),
  message: zod.string().max(500),
  is_read: zod.boolean(),
  created_at: zod.date(),
}).openapi('Notification');

export const getNotificationsResponseSchema = zod.object({
  success: zod.boolean(),
  notifications: zod.array(notificationsSchema),
  total_count: zod.number(),
  unread_count: zod.number(),
});

export const getNotificationResponseSchema = zod.object({
  success: zod.boolean(),
  notification: notificationsSchema,
}).openapi('GetNotificationResponse');

export const getNotificationsRequestSchema = zod.object({
  skip: zod.string().transform((val) => {
    const num = parseInt(val, 10);
    return isNaN(num) ? 0 : num;
  }).default(0),
  all: zod.boolean().default(false),
}).openapi('GetNotificationsRequest');

export const updateNotificationRequestSchema = zod.object({
  is_read: zod.boolean(),
}).openapi('UpdateNotificationRequest');