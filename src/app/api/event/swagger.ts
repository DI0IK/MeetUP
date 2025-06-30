import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

import {
  EventResponseSchema,
  EventsResponseSchema,
  createEventSchema,
} from './validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/event',
    responses: {
      200: {
        description: 'List of events for the authenticated user',
        content: {
          'application/json': {
            schema: EventsResponseSchema,
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
    method: 'post',
    path: '/api/event',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createEventSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Event created successfully.',
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
