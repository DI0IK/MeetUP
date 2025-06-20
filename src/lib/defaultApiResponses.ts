import {
  ErrorResponseSchema,
  ZodErrorResponseSchema,
} from '@/app/api/validation';

export const invalidRequestDataResponse = {
  400: {
    description: 'Invalid request data',
    content: {
      'application/json': {
        schema: ZodErrorResponseSchema,
      },
    },
  },
};

export const notAuthenticatedResponse = {
  401: {
    description: 'Not authenticated',
    content: {
      'application/json': {
        schema: ErrorResponseSchema,
        example: {
          success: false,
          message: 'Not authenticated',
        },
      },
    },
  },
};

export const userNotFoundResponse = {
  404: {
    description: 'User not found',
    content: {
      'application/json': {
        schema: ErrorResponseSchema,
        example: {
          success: false,
          message: 'User not found',
        },
      },
    },
  },
};

export const serverReturnedDataValidationErrorResponse = {
  500: {
    description: 'Server returned data validation error',
    content: {
      'application/json': {
        schema: ZodErrorResponseSchema,
        example: {
          success: false,
          message: 'Server returned data validation error',
        },
      },
    },
  },
};
