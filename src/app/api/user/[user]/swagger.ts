import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';

import {
  notAuthenticatedResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

import { UserIdParamSchema } from '../../validation';
import { PublicUserResponseSchema } from '../validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/user/{user}',
    request: {
      params: zod.object({
        user: UserIdParamSchema,
      }),
    },
    responses: {
      200: {
        description: 'User information retrieved successfully.',
        content: {
          'application/json': {
            schema: PublicUserResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
    },
    tags: ['User'],
  });
}
