import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { FullUserResponseSchema } from '../../validation';
import { updateUserPasswordServerSchema } from '../validation';
import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'patch',
    path: '/api/user/me/password',
    description: 'Update the password of the currently authenticated user',
    request: {
      body: {
        description: 'User password update request body',
        required: true,
        content: {
          'application/json': {
            schema: updateUserPasswordServerSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'User information updated successfully',
        content: {
          'application/json': {
            schema: FullUserResponseSchema,
          },
        },
      },
      ...invalidRequestDataResponse,
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['User'],
  });
}
