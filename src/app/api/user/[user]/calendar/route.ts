import { auth } from '@/auth';
import { prisma } from '@/prisma';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
import {
  userCalendarQuerySchema,
  UserCalendarResponseSchema,
  UserCalendarSchema,
} from './validation';
import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';
import { z } from 'zod/v4';

export const GET = auth(async function GET(req, { params }) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const dataRaw = Object.fromEntries(new URL(req.url).searchParams);
  const data = await userCalendarQuerySchema.safeParseAsync(dataRaw);
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
  const { end, start } = data.data;

  const requestUserId = authCheck.user.id;

  const requestedUserId = (await params).user;

  const requestedUser = await prisma.user.findFirst({
    where: {
      id: requestedUserId,
    },
    select: {
      meetingParts: {
        where: {
          meeting: {
            start_time: {
              lte: end,
            },
            end_time: {
              gte: start,
            },
          },
        },
        orderBy: {
          meeting: {
            start_time: 'asc',
          },
        },
        select: {
          meeting: {
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
              organizer_id: true,
              participants: {
                select: {
                  user: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      meetingsOrg: {
        where: {
          start_time: {
            lte: end,
          },
          end_time: {
            gte: start,
          },
        },
        orderBy: {
          start_time: 'asc',
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
          organizer_id: true,
          participants: {
            select: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      blockedSlots: {
        where: {
          start_time: {
            lte: end,
          },
          end_time: {
            gte: start,
          },
        },
        orderBy: {
          start_time: 'asc',
        },
        select: {
          id: requestUserId === requestedUserId ? true : false,
          reason: requestUserId === requestedUserId ? true : false,
          start_time: true,
          end_time: true,
          is_recurring: requestUserId === requestedUserId ? true : false,
          recurrence_end_date: requestUserId === requestedUserId ? true : false,
          rrule: requestUserId === requestedUserId ? true : false,
          created_at: requestUserId === requestedUserId ? true : false,
          updated_at: requestUserId === requestedUserId ? true : false,
        },
      },
    },
  });

  if (!requestedUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'User not found' },
      { status: 404 },
    );

  const calendar: z.input<typeof UserCalendarSchema> = [];

  for (const event of requestedUser.meetingParts) {
    if (
      event.meeting.participants.some((p) => p.user.id === requestUserId) ||
      event.meeting.organizer_id === requestUserId
    ) {
      calendar.push({ ...event.meeting, type: 'event' });
    } else {
      calendar.push({
        start_time: event.meeting.start_time,
        end_time: event.meeting.end_time,
        type: 'blocked_private',
      });
    }
  }

  for (const event of requestedUser.meetingsOrg) {
    if (
      event.participants.some((p) => p.user.id === requestUserId) ||
      event.organizer_id === requestUserId
    ) {
      calendar.push({ ...event, type: 'event' });
    } else {
      calendar.push({
        start_time: event.start_time,
        end_time: event.end_time,
        type: 'blocked_private',
      });
    }
  }

  for (const slot of requestedUser.blockedSlots) {
    calendar.push({
      start_time: slot.start_time,
      end_time: slot.end_time,
      id: slot.id,
      reason: slot.reason,
      is_recurring: slot.is_recurring,
      recurrence_end_date: slot.recurrence_end_date,
      rrule: slot.rrule,
      created_at: slot.created_at,
      updated_at: slot.updated_at,
      type:
        requestUserId === requestedUserId ? 'blocked_owned' : 'blocked_private',
    });
  }

  return returnZodTypeCheckedResponse(UserCalendarResponseSchema, {
    success: true,
    calendar,
  });
});
