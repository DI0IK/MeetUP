import { auth } from '@/auth';
import { prisma } from '@/prisma';
import {
  returnZodTypeCheckedResponse,
  userAuthenticated,
} from '@/lib/apiHelpers';
import {
  updateBlockedSlotSchema,
  BlockedSlotResponseSchema,
} from '@/app/api/blocked_slots/validation';
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

export const GET = auth(async function GET(req, { params }) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const slotID = (await params).slotID;

  const blockedSlot = await prisma.blockedSlot.findUnique({
    where: {
      id: slotID,
      user_id: authCheck.user.id,
    },
    select: {
      id: true,
      start_time: true,
      end_time: true,
      reason: true,
      created_at: true,
      updated_at: true,
      is_recurring: true,
      recurrence_end_date: true,
      rrule: true,
    },
  });

  if (!blockedSlot) {
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'Blocked slot not found or not owned by user',
      },
      { status: 404 },
    );
  }

  return returnZodTypeCheckedResponse(
    BlockedSlotResponseSchema,
    {
      blocked_slot: blockedSlot,
    },
    {
      status: 200,
    },
  );
});

export const PATCH = auth(async function PATCH(req, { params }) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const slotID = (await params).slotID;

  const dataRaw = await req.json();
  const data = await updateBlockedSlotSchema.safeParseAsync(dataRaw);
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

  const blockedSlot = await prisma.blockedSlot.update({
    where: {
      id: slotID,
      user_id: authCheck.user.id,
    },
    data: data.data,
    select: {
      id: true,
      start_time: true,
      end_time: true,
      reason: true,
      created_at: true,
      updated_at: true,
      is_recurring: true,
      recurrence_end_date: true,
      rrule: true,
    },
  });

  if (!blockedSlot) {
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'Blocked slot not found or not owned by user',
      },
      { status: 404 },
    );
  }

  return returnZodTypeCheckedResponse(
    BlockedSlotResponseSchema,
    { success: true, blocked_slot: blockedSlot },
    { status: 200 },
  );
});

export const DELETE = auth(async function DELETE(req, { params }) {
  const authCheck = userAuthenticated(req);
  if (!authCheck.continue)
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      authCheck.response,
      authCheck.metadata,
    );

  const slotID = (await params).slotID;

  const deletedSlot = await prisma.blockedSlot.delete({
    where: {
      id: slotID,
      user_id: authCheck.user.id,
    },
  });

  if (!deletedSlot) {
    return returnZodTypeCheckedResponse(
      ErrorResponseSchema,
      {
        success: false,
        message: 'Blocked slot not found or not owned by user',
      },
      { status: 404 },
    );
  }

  return returnZodTypeCheckedResponse(
    SuccessResponseSchema,
    { success: true },
    {
      status: 200,
    },
  );
});
