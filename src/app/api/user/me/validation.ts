import zod from 'zod/v4';
import {
  firstNameSchema,
  lastNameSchema,
  newUserEmailServerSchema,
  newUserNameServerSchema,
} from '@/app/api/user/validation';

// ----------------------------------------
//
// Update User Validation
//
// ----------------------------------------
export const updateUserServerSchema = zod.object({
  name: newUserNameServerSchema.optional(),
  first_name: firstNameSchema.optional(),
  last_name: lastNameSchema.optional(),
  email: newUserEmailServerSchema.optional(),
  image: zod.string().optional(),
  timezone: zod.string().optional(),
});
