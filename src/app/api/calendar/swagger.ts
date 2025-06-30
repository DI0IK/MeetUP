import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import {
  notAuthenticatedResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

import {
  UserCalendarResponseSchema,
  userCalendarQuerySchema,
} from './validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/calendar',
    request: {
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
    tags: ['Calendar'],
  });
}
