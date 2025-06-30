import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';

import { registry } from '@/lib/swagger';

extendZodWithOpenApi(zod);

export const ErrorResponseSchema = zod
  .object({
    success: zod.boolean(),
    message: zod.string(),
  })
  .openapi('ErrorResponseSchema', {
    description: 'Error response schema',
    example: {
      success: false,
      message: 'An error occurred',
    },
  });

export const ZodErrorResponseSchema = ErrorResponseSchema.extend({
  errors: zod.array(
    zod.object({
      expected: zod.string().optional(),
      code: zod.string(),
      path: zod.array(
        zod
          .string()
          .or(zod.number())
          .or(
            zod.symbol().openapi({
              type: 'string',
            }),
          ),
      ),
      message: zod.string(),
    }),
  ),
}).openapi('ZodErrorResponseSchema', {
  description: 'Zod error response schema',
  example: {
    success: false,
    message: 'Invalid request data',
    errors: [
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['first_name'],
        message: 'Invalid input: expected string, received number',
      },
    ],
  },
});

export const SuccessResponseSchema = zod
  .object({
    success: zod.boolean(),
    message: zod.string().optional(),
  })
  .openapi('SuccessResponseSchema', {
    description: 'Success response schema',
    example: {
      success: true,
      message: 'Operation completed successfully',
    },
  });

export const UserIdParamSchema = registry.registerParameter(
  'UserIdOrNameParam',
  zod.string().openapi({
    param: {
      name: 'user',
      in: 'path',
    },
    example: '12345',
  }),
);

export const EventIdParamSchema = registry.registerParameter(
  'EventIdParam',
  zod.string().openapi({
    param: {
      name: 'eventID',
      in: 'path',
    },
    example: '67890',
  }),
);
