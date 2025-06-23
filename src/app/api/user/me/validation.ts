import zod from 'zod/v4';
import {
  firstNameSchema,
  lastNameSchema,
  newUserEmailServerSchema,
  newUserNameServerSchema,
  passwordSchema,
  timezoneSchema,
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
  image: zod.url().optional(),
  timezone: timezoneSchema.optional(),
});

export const updateUserPasswordServerSchema = zod
  .object({
    current_password: zod.string().min(1, 'Current password is required'),
    new_password: passwordSchema,
    confirm_new_password: passwordSchema,
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'New password and confirm new password must match',
  });
