import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';

import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

import {
  EventIdParamSchema,
  SuccessResponseSchema,
} from '@/app/api/validation';

import { EventResponseSchema, updateEventSchema } from '@/app/api/event/validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/event/{eventID}',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'Event retrieved successfully',
        content: {
          'application/json': {
            schema: EventResponseSchema,
          },
        },
      },
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Event'],
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/event/{eventID}',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'Event deleted successfully',
        content: {
          'application/json': {
            schema: SuccessResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Event'],
  });

  registry.registerPath({
    method: 'patch',
    path: '/api/event/{eventID}',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
      }),
      body: {
        content: {
          'application/json': {
            schema: updateEventSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Event updated successfully',
        content: {
          'application/json': {
            schema: EventResponseSchema,
          },
        },
      },
      ...invalidRequestDataResponse,
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Event'],
  });
}
