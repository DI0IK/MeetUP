import { z } from 'zod/v4';

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
  UserCalendarResponseSchema,
  UserCalendarSchema,
  userCalendarQuerySchema,
} from './validation';

export const GET = auth(async function GET(req) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const dataRaw: Record<string, string | string[]> = {};
  for (const [key, value] of req.nextUrl.searchParams.entries()) {
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      if (!dataRaw[cleanKey]) {
        dataRaw[cleanKey] = [];
      }
      if (Array.isArray(dataRaw[cleanKey])) {
        (dataRaw[cleanKey] as string[]).push(value);
      } else {
        dataRaw[cleanKey] = [dataRaw[cleanKey] as string, value];
      }
    } else {
      dataRaw[key] = value;
    }
  }
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
  const { end, start, userIds } = data.data;

  const requestUserId = authCheck.user.id;

  const requestedUser = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
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
          status: {
            not: 'DECLINED',
          },
        },
        orderBy: {
          meeting: {
            start_time: 'asc',
          },
        },
        select: {
          user_id: true,
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
          user_id: true,
          id: true,
          reason: true,
          start_time: true,
          end_time: true,
          is_recurring: true,
          recurrence_end_date: true,
          rrule: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  if (!requestedUser)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      { success: false, message: 'User/s not found' },
      { status: 404 },
    );

  const calendar: z.input<typeof UserCalendarSchema> = [];

  for (const event of requestedUser.map((r) => r.meetingParts).flat()) {
    if (
      event.meeting.participants.some((p) => p.user.id === requestUserId) ||
      event.meeting.organizer_id === requestUserId
    ) {
      calendar.push({
        ...event.meeting,
        type: 'event',
        users: event.meeting.participants
          .map((p) => p.user.id)
          .filter((id) => userIds.includes(id)),
      });
    } else {
      calendar.push({
        id: event.meeting.id,
        start_time: event.meeting.start_time,
        end_time: event.meeting.end_time,
        type: 'blocked_private',
        users: event.meeting.participants
          .map((p) => p.user.id)
          .filter((id) => userIds.includes(id)),
      });
    }
  }

  for (const event of requestedUser.map((r) => r.meetingsOrg).flat()) {
    if (
      event.participants.some((p) => p.user.id === requestUserId) ||
      event.organizer_id === requestUserId
    ) {
      calendar.push({
        ...event,
        type: 'event',
        users: event.participants
          .map((p) => p.user.id)
          .filter((id) => userIds.includes(id)),
      });
    } else {
      calendar.push({
        id: event.id,
        start_time: event.start_time,
        end_time: event.end_time,
        type: 'blocked_private',
        users: event.participants
          .map((p) => p.user.id)
          .filter((id) => userIds.includes(id)),
      });
    }
  }

  for (const slot of requestedUser.map((r) => r.blockedSlots).flat()) {
    if (requestUserId === userIds[0] && userIds.length === 1) {
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
        type: 'blocked_owned',
        users: [requestUserId],
      });
    } else {
      calendar.push({
        start_time: slot.start_time,
        end_time: slot.end_time,
        id: slot.id,
        type: 'blocked_private',
        users: [slot.user_id],
      });
    }
  }

  return returnZodTypeCheckedResponse(UserCalendarResponseSchema, {
    success: true,
    calendar: calendar.filter(
      (event, index, self) =>
        self.findIndex((e) => e.id === event.id && e.type === event.type) ===
        index,
    ),
  });
});
