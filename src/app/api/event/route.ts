import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';

import { auth } from '@/auth';
import { prisma } from '@/prisma';

import { ErrorResponseSchema, ZodErrorResponseSchema } from '@/app/api/validation';
import {
  EventResponseSchema,
  EventsResponseSchema,
  createEventSchema,
} from './validation';

export const GET = auth(async (req) => {
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

  const userEvents = await prisma.meeting.findMany({
    where: {
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
    EventsResponseSchema,
    {
      success: true,
      events: userEvents,
    },
    { status: 200 },
  );
});

export const POST = auth(async (req) => {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const dataRaw = await req.json();
  const data = await createEventSchema.safeParseAsync(dataRaw);
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
  const { title, description, start_time, end_time, location, participants } =
    data.data;

  const newEvent = await prisma.meeting.create({
    data: {
      title,
      description,
      start_time,
      end_time,
      location,
      organizer_id: authCheck.user.id!,
      participants: participants
        ? {
            create: participants.map((userId) => ({
              user: { connect: { id: userId } },
            })),
          }
        : undefined,
    },
    select: {
      id: true,
      title: true,
      description: true,
      start_time: true,
      end_time: true,
      status: true,
      location: true,
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
      event: newEvent,
    },
    { status: 201 },
  );
});
