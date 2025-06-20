import zod from 'zod/v4';
import { PublicUserSchema } from '../../user/validation';

export const searchUserSchema = zod.object({
  query: zod.string().optional().default(''),
  count: zod.coerce.number().min(1).max(100).default(10),
  page: zod.coerce.number().min(1).default(1),
  sort_by: zod
    .enum(['created_at', 'name', 'first_name', 'last_name', 'id'])
    .optional()
    .default('created_at'),
  sort_order: zod.enum(['asc', 'desc']).optional().default('desc'),
});

export const searchUserResponseSchema = zod.object({
  success: zod.boolean(),
  users: zod.array(PublicUserSchema),
  total_count: zod.number(),
  total_pages: zod.number(),
});
