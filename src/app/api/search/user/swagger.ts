import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

import { searchUserResponseSchema, searchUserSchema } from './validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/search/user',
    request: {
      query: searchUserSchema,
    },
    responses: {
      200: {
        description: 'User search results',
        content: {
          'application/json': {
            schema: searchUserResponseSchema,
          },
        },
      },
      ...invalidRequestDataResponse,
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Search'],
  });
}
