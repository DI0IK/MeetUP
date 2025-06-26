import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  getNotificationsRequestSchema,
  getNotificationsResponseSchema,
} from './validation';
import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'get',
    path: '/api/notifications',
    request: {
      query: getNotificationsRequestSchema,
    },
    responses: {
      200: {
        description: 'List of notifications for the authenticated user',
        content: {
          'application/json': {
            schema: getNotificationsResponseSchema,
          },
        },
      },
      ...invalidRequestDataResponse,
      ...notAuthenticatedResponse,
      ...userNotFoundResponse,
      ...serverReturnedDataValidationErrorResponse,
    },
    tags: ['Notifications'],
  });
}
