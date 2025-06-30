import { auth } from '@/auth';
import { prisma } from '@/prisma';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
import {
  blockedSlotsQuerySchema,
  BlockedSlotsResponseSchema,
  BlockedSlotsSchema,
  createBlockedSlotSchema,
} from './validation';
import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

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
  const data = await blockedSlotsQuerySchema.safeParseAsync(dataRaw);
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
  const { start, end } = data.data;

  const requestUserId = authCheck.user.id;

  const blockedSlots = await prisma.blockedSlot.findMany({
    where: {
      user_id: requestUserId,
      start_time: { gte: start },
      end_time: { lte: end },
    },
    orderBy: { start_time: 'asc' },
    select: {
      id: true,
      start_time: true,
      end_time: true,
      reason: true,
      created_at: true,
      updated_at: true,
    },
  });

  return returnZodTypeCheckedResponse(
    BlockedSlotsResponseSchema,
    { success: true, blocked_slots: blockedSlots },
    { status: 200 },
  );
});

export const POST = auth(async function POST(req) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const dataRaw = await req.json();
  const data = await createBlockedSlotSchema.safeParseAsync(dataRaw);
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

  const requestUserId = authCheck.user.id;

  if (!requestUserId) {
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'User not authenticated',
      },
      { status: 401 },
    );
  }

  const blockedSlot = await prisma.blockedSlot.create({
    data: {
      ...data.data,
      user_id: requestUserId,
    },
  });

  return returnZodTypeCheckedResponse(BlockedSlotsSchema, blockedSlot, {
    status: 201,
  });
});
