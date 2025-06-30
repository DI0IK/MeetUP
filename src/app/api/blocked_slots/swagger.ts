import {
  BlockedSlotResponseSchema,
  BlockedSlotsResponseSchema,
  blockedSlotsQuerySchema,
  createBlockedSlotSchema,
} from './validation';
import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/blocked_slots',
    request: {
      query: blockedSlotsQuerySchema,
    },
    responses: {
      200: {
        description: 'Blocked slots retrieved successfully.',
        content: {
          'application/json': {
            schema: BlockedSlotsResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Blocked Slots'],
  });

  registry.registerPath({
    method: 'post',
    path: '/api/blocked_slots',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createBlockedSlotSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Blocked slot created successfully.',
        content: {
          'application/json': {
            schema: BlockedSlotResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
      ...invalidRequestDataResponse,
    },
    tags: ['Blocked Slots'],
  });
}
