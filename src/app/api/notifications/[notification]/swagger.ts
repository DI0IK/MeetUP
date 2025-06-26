import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  invalidRequestDataResponse,
  notAuthenticatedResponse,
  serverReturnedDataValidationErrorResponse,
  userNotFoundResponse,
} from '@/lib/defaultApiResponses';
import { getNotificationResponseSchema, updateNotificationRequestSchema } from '../validation';
import zod from 'zod/v4';
import { NotificationIdSchema } from '../../validation';

export default function registerSwaggerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: 'patch',
    path: '/api/notifications/{notification}',
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateNotificationRequestSchema,
          },
        },
      },
      params: zod.object({
        notification: NotificationIdSchema,
      }),
    },
    responses: {
      200: {
        description: 'Notification updated successfully',
        content: {
          'application/json': {
            schema: getNotificationResponseSchema,
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
