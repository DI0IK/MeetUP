import { prisma } from '@/prisma';
import { auth } from '@/auth';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';
import {
  ParticipantResponseSchema,
  updateParticipantSchema,
} from '../validation';

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
  const user = (await params).user;

  const isParticipant = await prisma.meetingParticipant.findFirst({
    where: {
      meeting_id: eventID,
      user_id: dbUser.id,
    },
  });

  const isOrganizer = await prisma.meeting.findFirst({
    where: {
      id: eventID,
      organizer_id: dbUser.id,
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

  const participant = await prisma.meetingParticipant.findUnique({
    where: {
      meeting_id_user_id: {
        meeting_id: eventID,
        user_id: user,
      },
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

  if (!participant)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Participant not found' },
      { status: 404 },
    );

  return returnZodTypeCheckedResponse(ParticipantResponseSchema, {
    success: true,
    participant,
  });
});

export const DELETE = auth(async (req, { params }) => {
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
  const user = (await params).user;

  const isOrganizer = await prisma.meeting.findFirst({
    where: {
      id: eventID,
      organizer_id: dbUser.id,
    },
  });

  if (!isOrganizer)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Only organizer can remove participants' },
      { status: 403 },
    );

  const participant = await prisma.meetingParticipant.findUnique({
    where: {
      meeting_id_user_id: {
        meeting_id: eventID,
        user_id: user,
      },
    },
  });

  if (!participant)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Participant not found' },
      { status: 404 },
    );

  await prisma.meetingParticipant.delete({
    where: {
      meeting_id_user_id: {
        meeting_id: eventID,
        user_id: user,
      },
    },
  });

  return returnZodTypeCheckedResponse(
    SuccessResponseSchema,
    { success: true, message: 'Participant removed successfully' },
    { status: 200 },
  );
});

export const PATCH = auth(async (req, { params }) => {
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
  const user = (await params).user;

  if (dbUser.id !== user && dbUser.name !== user)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'You can only update your own participation' },
      { status: 403 },
    );

  const participant = await prisma.meetingParticipant.findUnique({
    where: {
      meeting_id_user_id: {
        meeting_id: eventID,
        user_id: dbUser.id,
      },
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

  if (!participant)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Participant not found' },
      { status: 404 },
    );

  const body = await req.json();
  const parsedBody = await updateParticipantSchema.safeParseAsync(body);
  if (!parsedBody.success)
    return returnZodTypeCheckedResponse(
      ZodErrorResponseSchema,
      {
        success: false,
        message: 'Invalid request body',
        errors: parsedBody.error.issues,
      },
      { status: 400 },
    );
  const { status } = parsedBody.data;

  const updatedParticipant = await prisma.meetingParticipant.update({
    where: {
      meeting_id_user_id: {
        meeting_id: eventID,
        user_id: dbUser.id,
      },
    },
    data: {
      status,
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
    participant: updatedParticipant,
  });
});
