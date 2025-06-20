import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { FullUserResponseSchema } from '../validation';
import { updateUserServerSchema } from './validation';
import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/user/me',
    description: 'Get the currently authenticated user',
    responses: {
      200: {
        description: 'User information retrieved successfully',
        content: {
          'application/json': {
            schema: FullUserResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['User'],
  });

  registry.registerPath({
    method: 'patch',
    path: '/api/user/me',
    description: 'Update the currently authenticated user',
    request: {
      body: {
        description: 'User information to update',
        required: true,
        content: {
          'application/json': {
            schema: updateUserServerSchema,
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
