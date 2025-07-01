import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';
import {
  eventEndTimeSchema,
  eventStartTimeSchema,
} from '@/app/api/event/validation';

extendZodWithOpenApi(zod);

export const blockedSlotsQuerySchema = zod.object({
  start: eventStartTimeSchema.optional(),
  end: eventEndTimeSchema.optional(),
});

export const blockedSlotRecurrenceEndDateSchema = zod.iso
  .datetime()
  .or(zod.date().transform((date) => date.toISOString()));

export const BlockedSlotsSchema = zod
  .object({
    start_time: eventStartTimeSchema,
    end_time: eventEndTimeSchema,
    id: zod.string(),
    reason: zod.string().nullish(),
    created_at: zod.date(),
    updated_at: zod.date(),
  })
  .openapi('BlockedSlotsSchema', {
    description: 'Blocked time slot in the user calendar',
  });

export const BlockedSlotsResponseSchema = zod.object({
  success: zod.boolean().default(true),
  blocked_slots: zod.array(BlockedSlotsSchema),
});

export const BlockedSlotResponseSchema = zod.object({
  success: zod.boolean().default(true),
  blocked_slot: BlockedSlotsSchema,
});

export const createBlockedSlotSchema = zod
  .object({
    start_time: eventStartTimeSchema,
    end_time: eventEndTimeSchema,
    reason: zod.string().nullish(),
  })
  .refine(
    (data) => {
      return new Date(data.start_time) < new Date(data.end_time);
    },
    {
      message: 'Start time must be before end time',
      path: ['end_time'],
    },
  );

export const createBlockedSlotClientSchema = zod
  .object({
    start_time: zod.iso.datetime({ local: true }),
    end_time: zod.iso.datetime({ local: true }),
    reason: zod.string().nullish(),
  })
  .refine(
    (data) => {
      return new Date(data.start_time) < new Date(data.end_time);
    },
    {
      message: 'Start time must be before end time',
      path: ['end_time'],
    },
  );

export const updateBlockedSlotSchema = zod.object({
  start_time: eventStartTimeSchema.optional(),
  end_time: eventEndTimeSchema.optional(),
  reason: zod.string().optional(),
});
