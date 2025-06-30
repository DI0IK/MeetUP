import {
  updateBlockedSlotSchema,
  BlockedSlotResponseSchema,
} from '@/app/api/blocked_slots/validation';
import {
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
  invalidRequestDataResponse,
} from '@/lib/defaultApiResponses';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { SlotIdParamSchema } from '@/app/api/validation';
import zod from 'zod/v4';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/blocked_slots/{slotID}',
    request: {
      params: zod.object({
        slotID: SlotIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'Blocked slot retrieved successfully',
        content: {
          'application/json': {
            schema: BlockedSlotResponseSchema,
          },
        },
      },
      ...userNotFoundResponse,
      ...notAuthenticatedResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Blocked Slots'],
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/blocked_slots/{slotID}',
    request: {
      params: zod.object({
        slotID: SlotIdParamSchema,
      }),
    },
    responses: {
      204: {
        description: 'Blocked slot deleted successfully',
      },
      ...userNotFoundResponse,
      ...notAuthenticatedResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Blocked Slots'],
  });

  registry.registerPath({
    method: 'patch',
    path: '/api/blocked_slots/{slotID}',
    request: {
      params: zod.object({
        slotID: SlotIdParamSchema,
      }),
      body: {
        content: {
          'application/json': {
            schema: updateBlockedSlotSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Blocked slot updated successfully',
        content: {
          'application/json': {
            schema: BlockedSlotResponseSchema,
          },
        },
      },
      ...userNotFoundResponse,
      ...notAuthenticatedResponse,
      ...serverReturnedDataValidationErrorResponse,
      ...invalidRequestDataResponse,
    },
    tags: ['Blocked Slots'],
  });
}
