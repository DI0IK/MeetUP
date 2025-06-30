import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';

import {
  EventSchema,
  eventEndTimeSchema,
  eventStartTimeSchema,
} from '@/app/api/event/validation';

extendZodWithOpenApi(zod);

export const BlockedSlotSchema = zod
  .object({
    start_time: eventStartTimeSchema,
    end_time: eventEndTimeSchema,
    type: zod.literal('blocked_private'),
    id: zod.string(),
    users: zod.string().array(),
    user_id: zod.string().optional(),
  })
  .openapi('BlockedSlotSchema', {
    description: 'Blocked time slot in the user calendar',
  });

export const OwnedBlockedSlotSchema = zod
  .object({
    start_time: eventStartTimeSchema,
    end_time: eventEndTimeSchema,
    id: zod.string(),
    reason: zod.string().nullish(),
    is_recurring: zod.boolean().default(false),
    recurrence_end_date: zod.date().nullish(),
    rrule: zod.string().nullish(),
    created_at: zod.date().nullish(),
    updated_at: zod.date().nullish(),
    type: zod.literal('blocked_owned'),
    users: zod.string().array(),
    user_id: zod.string().optional(),
  })
  .openapi('OwnedBlockedSlotSchema', {
    description: 'Blocked slot owned by the user',
  });

export const VisibleSlotSchema = EventSchema.omit({
  participants: true,
  organizer: true,
})
  .extend({
    type: zod.literal('event'),
    users: zod.string().array(),
    user_id: zod.string().optional(),
  })
  .openapi('VisibleSlotSchema', {
    description: 'Visible time slot in the user calendar',
  });

export const UserCalendarSchema = zod
  .array(VisibleSlotSchema.or(BlockedSlotSchema).or(OwnedBlockedSlotSchema))
  .openapi('UserCalendarSchema', {
    description: 'Array of events in the user calendar',
  });

export const UserCalendarResponseSchema = zod.object({
  success: zod.boolean().default(true),
  calendar: UserCalendarSchema,
});

export const userCalendarQuerySchema = zod
  .object({
    start: zod.iso
      .datetime()
      .optional()
      .transform((val) => {
        if (val) return new Date(val);
        const now = new Date();
        const startOfWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        );
        return startOfWeek;
      }),
    end: zod.iso
      .datetime()
      .optional()
      .transform((val) => {
        if (val) return new Date(val);
        const now = new Date();
        const endOfWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + (6 - now.getDay()),
        );
        return endOfWeek;
      }),
    userIds: zod.string().array(),
  })
  .openapi('UserCalendarQuerySchema', {
    description: 'Query parameters for filtering the user calendar',
    properties: {
      start: {
        type: 'string',
        format: 'date-time',
        description: 'Start date for filtering the calendar events',
      },
      end: {
        type: 'string',
        format: 'date-time',
        description: 'End date for filtering the calendar events',
      },
    },
  });
