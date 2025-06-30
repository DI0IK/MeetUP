import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';

import {
  EventResponseSchema,
  updateEventSchema,
} from '@/app/api/event/validation';
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

import { auth } from '@/auth';
import { prisma } from '@/prisma';

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

  const event = await prisma.meeting.findUnique({
    where: {
      id: eventID,
      OR: [
        { organizer_id: dbUser.id },
        { participants: { some: { user_id: dbUser.id } } },
      ],
    },
    select: {
      id: true,
      title: true,
      description: true,
      start_time: true,
      end_time: true,
      status: true,
      location: true,
      organizer_id: true,
      created_at: true,
      updated_at: true,
      organizer: {
        select: {
          id: true,
          name: true,
          first_name: true,
          last_name: true,
          image: true,
          timezone: true,
        },
      },
      participants: {
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
      },
    },
  });

  if (!event)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Event not found' },
      { status: 404 },
    );

  return returnZodTypeCheckedResponse(
    EventResponseSchema,
    { success: true, event },
    { status: 200 },
  );
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

  const event = await prisma.meeting.findUnique({
    where: {
      id: eventID,
      OR: [
        { organizer_id: dbUser.id },
        { participants: { some: { user_id: dbUser.id } } },
      ],
    },
  });

  if (!event)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Event not found' },
      { status: 404 },
    );

  if (event.organizer_id !== dbUser.id)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'You are not the organizer of this event' },
      { status: 403 },
    );

  await prisma.meeting.delete({
    where: {
      id: eventID,
    },
  });

  return returnZodTypeCheckedResponse(
    SuccessResponseSchema,
    { success: true, message: 'Event deleted successfully' },
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

  const event = await prisma.meeting.findUnique({
    where: {
      id: eventID,
      OR: [
        { organizer_id: dbUser.id },
        { participants: { some: { user_id: dbUser.id } } },
      ],
    },
  });

  if (!event)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'Event not found' },
      { status: 404 },
    );

  if (event.organizer_id !== dbUser.id)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'You are not the organizer of this event' },
      { status: 403 },
    );

  const dataRaw = await req.json();
  const data = await updateEventSchema.safeParseAsync(dataRaw);
  if (!data.success) {
    return returnZodTypeCheckedResponse(
      ZodErrorResponseSchema,
      {
        success: false,
        message: 'Invalid input data',
        errors: data.error.issues,
      },
      { status: 400 },
    );
  }
  const {
    title,
    description,
    start_time,
    end_time,
    location,
    status,
    participants,
  } = data.data;

  if (participants !== undefined)
    for (const participant of participants) {
      await prisma.meetingParticipant.upsert({
        where: {
          meeting_id_user_id: {
            user_id: participant,
            meeting_id: eventID,
          },
        },
        create: {
          user_id: participant,
          meeting_id: eventID,
        },
        update: {},
      });
    }

  const updatedEvent = await prisma.meeting.update({
    where: {
      id: eventID,
    },
    data: {
      title,
      description,
      start_time,
      end_time,
      location,
      status,
      participants:
        participants !== undefined
          ? {
              deleteMany: {
                user_id: {
                  notIn: participants || [],
                },
              },
            }
          : {},
    },
    select: {
      id: true,
      title: true,
      description: true,
      start_time: true,
      end_time: true,
      status: true,
      location: true,
      organizer_id: true,
      created_at: true,
      updated_at: true,
      organizer: {
        select: {
          id: true,
          name: true,
          first_name: true,
          last_name: true,
          image: true,
          timezone: true,
        },
      },
      participants: {
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
      },
    },
  });

  return returnZodTypeCheckedResponse(
    EventResponseSchema,
    {
      success: true,
      event: updatedEvent,
    },
    { status: 200 },
  );
});
