import {
  userCalendarQuerySchema,
  UserCalendarResponseSchema,
} from './validation';
import {
  notAuthenticatedResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';
import { UserIdParamSchema } from '@/app/api/validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/user/{user}/calendar',
    request: {
      params: zod.object({
        user: UserIdParamSchema,
      }),
      query: userCalendarQuerySchema,
    },
    responses: {
      200: {
        description: 'User calendar retrieved successfully.',
        content: {
          'application/json': {
            schema: UserCalendarResponseSchema,
          },
        },
      },
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
    },
    tags: ['User'],
  });
}
