import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';
import {
  existingUserIdServerSchema,
  PublicUserSchema,
} from '../user/validation';
import { ParticipantSchema } from './[eventID]/participant/validation';

extendZodWithOpenApi(zod);

// ----------------------------------------
//
// Event ID Validation
//
// ----------------------------------------
export const eventIdSchema = zod.string().min(1, 'Event ID is required');

// ----------------------------------------
//
// Event Title Validation
//
// ----------------------------------------
export const eventTitleSchema = zod
  .string()
  .min(1, 'Title is required')
  .max(100, 'Title must be at most 100 characters long');

// ----------------------------------------
//
// Event Description Validation
//
// ----------------------------------------
export const eventDescriptionSchema = zod
  .string()
  .max(500, 'Description must be at most 500 characters long');

// ----------------------------------------
//
// Event start time Validation
//
// ----------------------------------------
export const eventStartTimeSchema = zod.iso
  .datetime()
  .or(zod.date().transform((date) => date.toISOString()))
  .refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Invalid start time',
  });

// ----------------------------------------
//
// Event end time Validation
//
// ----------------------------------------
export const eventEndTimeSchema = zod.iso.datetime().or(
  zod
    .date()
    .transform((date) => date.toISOString())
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: 'Invalid end time',
    }),
);

// ----------------------------------------
//
// Event Location Validation
//
// ----------------------------------------
export const eventLocationSchema = zod
  .string()
  .max(200, 'Location must be at most 200 characters long');

// ----------------------------------------
//
// Event Participants Validation
//
// ----------------------------------------
export const eventParticipantsSchema = zod.array(existingUserIdServerSchema);

// ----------------------------------------
//
// Event Status Validation
//
// ----------------------------------------
export const eventStatusSchema = zod.enum([
  'TENTATIVE',
  'CONFIRMED',
  'CANCELLED',
]);

// ----------------------------------------
//
// Create Event Schema
//
// ----------------------------------------
export const createEventSchema = zod
  .object({
    title: eventTitleSchema,
    description: eventDescriptionSchema.optional(),
    start_time: eventStartTimeSchema,
    end_time: eventEndTimeSchema,
    location: eventLocationSchema.optional().default(''),
    participants: eventParticipantsSchema.optional(),
    status: eventStatusSchema.optional().default('TENTATIVE'),
  })
  .refine((data) => new Date(data.start_time) < new Date(data.end_time), {
    message: 'Start time must be before end time',
  });

// ----------------------------------------
//
// Update Event Schema
//
// ----------------------------------------
export const updateEventSchema = zod
  .object({
    title: eventTitleSchema.optional(),
    description: eventDescriptionSchema.optional(),
    start_time: eventStartTimeSchema.optional(),
    end_time: eventEndTimeSchema.optional(),
    location: eventLocationSchema.optional().default(''),
    participants: eventParticipantsSchema.optional(),
    status: eventStatusSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        return new Date(data.start_time) < new Date(data.end_time);
      }
      return true;
    },
    {
      message: 'Start time must be before end time',
    },
  );

// ----------------------------------------
//
// Event Schema Validation (for API responses)
//
// ----------------------------------------
export const EventSchema = zod
  .object({
    id: eventIdSchema,
    title: eventTitleSchema,
    description: eventDescriptionSchema.nullish(),
    start_time: eventStartTimeSchema,
    end_time: eventEndTimeSchema,
    location: eventLocationSchema.nullish(),
    status: eventStatusSchema,
    created_at: zod.date(),
    updated_at: zod.date(),
    organizer: PublicUserSchema,
    participants: zod.array(ParticipantSchema).nullish(),
  })
  .openapi('Event', {
    description: 'Event information including all fields',
  });

export const EventResponseSchema = zod.object({
  success: zod.boolean(),
  event: EventSchema,
});

export const EventsResponseSchema = zod.object({
  success: zod.boolean(),
  events: zod.array(EventSchema),
});
