import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';

import {
  PublicUserSchema,
  existingUserIdServerSchema,
} from '@/app/api/user/validation';

extendZodWithOpenApi(zod);

export const participantStatusSchema = zod.enum([
  'ACCEPTED',
  'DECLINED',
  'TENTATIVE',
  'PENDING',
]);

export const inviteParticipantSchema = zod
  .object({
    user_id: existingUserIdServerSchema,
  })
  .openapi('InviteParticipant', {
    description: 'Schema for inviting a participant to an event',
  });

export const updateParticipantSchema = zod
  .object({
    status: participantStatusSchema,
  })
  .openapi('UpdateParticipant', {
    description: 'Schema for updating participant status in an event',
  });

export const ParticipantSchema = zod
  .object({
    user: PublicUserSchema,
    status: participantStatusSchema,
  })
  .openapi('Participant', {
    description: 'Participant information including user and status',
  });

export const ParticipantResponseSchema = zod.object({
  success: zod.boolean(),
  participant: ParticipantSchema,
});

export const ParticipantsResponseSchema = zod.object({
  success: zod.boolean(),
  participants: zod.array(ParticipantSchema),
});
