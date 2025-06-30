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
  UserIdParamSchema,
} from '@/app/api/validation';

import {
  ParticipantResponseSchema,
  updateParticipantSchema,
} from '../validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/event/{eventID}/participant/{user}',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
        user: UserIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'Get a participant for the event',
        content: {
          'application/json': {
            schema: ParticipantResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Event Participant'],
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/event/{eventID}/participant/{user}',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
        user: UserIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'Participant removed successfully',
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
    tags: ['Event Participant'],
  });

  registry.registerPath({
    method: 'patch',
    path: '/api/event/{eventID}/participant/{user}',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
        user: UserIdParamSchema,
      }),
      body: {
        content: {
          'application/json': {
            schema: updateParticipantSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Participant updated successfully',
        content: {
          'application/json': {
            schema: ParticipantResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
      ...invalidRequestDataResponse,
    },
    tags: ['Event Participant'],
  });
}
