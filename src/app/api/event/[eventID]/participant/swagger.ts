import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';
import {
  ParticipantsResponseSchema,
  ParticipantResponseSchema,
  inviteParticipantSchema,
} from './validation';
import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';
import { EventIdParamSchema } from '@/app/api/validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/event/{eventID}/participant',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'List participants for the event',
        content: {
          'application/json': {
            schema: ParticipantsResponseSchema,
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
    method: 'post',
    path: '/api/event/{eventID}/participant',
    request: {
      params: zod.object({
        eventID: EventIdParamSchema,
      }),
      body: {
        content: {
          'application/json': {
            schema: inviteParticipantSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Participant invited successfully',
        content: {
          'application/json': {
            schema: ParticipantResponseSchema,
          },
        },
      },
      ...invalidRequestDataResponse,
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Event Participant'],
  });
}
