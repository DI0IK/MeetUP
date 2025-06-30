import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';

import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

import { auth } from '@/auth';
import { prisma } from '@/prisma';

import {
  ParticipantResponseSchema,
  ParticipantsResponseSchema,
  inviteParticipantSchema,
} from './validation';

export const GET = auth(async (req, { params }) => {
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
  });

  if (!dbUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'User not found' },
      { status: 404 },
    );

  const eventID = (await params).eventID;

  const isParticipant = await prisma.meetingParticipant.findFirst({
    where: {
      meeting_id: eventID,
      user_id: dbUser.id,
    },
    select: {
      status: true,
    },
  });

  const isOrganizer = await prisma.meeting.findFirst({
    where: {
      id: eventID,
      organizer_id: dbUser.id,
    },
    select: {
      id: true,
    },
  });

  if (!isParticipant && !isOrganizer)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User is not a participant or organizer of this event',
      },
      { status: 403 },
    );

  const participants = await prisma.meetingParticipant.findMany({
    where: {
      meeting_id: eventID,
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          first_name: true,
          last_name: true,
          image: true,
          timezone: true,
        },
      },
      status: true,
    },
  });

  return returnZodTypeCheckedResponse(ParticipantsResponseSchema, {
    success: true,
    participants,
  });
});

export const POST = auth(async (req, { params }) => {
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
  });

  if (!dbUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'User not found' },
      { status: 404 },
    );

  const eventID = (await params).eventID;

  const isOrganizer = await prisma.meeting.findFirst({
    where: {
      id: eventID,
      organizer_id: dbUser.id,
    },
  });

  if (!isOrganizer)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Only organizers can add participants' },
      { status: 403 },
    );

  const dataRaw = await req.json();
  const data = await inviteParticipantSchema.safeParseAsync(dataRaw);
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
  const { user_id } = data.data;

  const participantExists = await prisma.meetingParticipant.findFirst({
    where: {
      meeting_id: eventID,
      user_id,
    },
  });

  if (participantExists)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User is already a participant of this event',
      },
      { status: 409 },
    );

  const newParticipant = await prisma.meetingParticipant.create({
    data: {
      meeting_id: eventID,
      user_id,
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          first_name: true,
          last_name: true,
          image: true,
          timezone: true,
        },
      },
      status: true,
    },
  });

  return returnZodTypeCheckedResponse(ParticipantResponseSchema, {
    success: true,
    participant: {
      user: {
        id: newParticipant.user.id,
        name: newParticipant.user.name,
        first_name: newParticipant.user.first_name,
        last_name: newParticipant.user.last_name,
        image: newParticipant.user.image,
        timezone: newParticipant.user.timezone,
      },
      status: newParticipant.status,
    },
  });
});
