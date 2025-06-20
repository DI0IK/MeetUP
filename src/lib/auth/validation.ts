import zod from 'zod/v4';
import {
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  newUserEmailServerSchema,
  newUserNameServerSchema,
  passwordSchema,
  userNameSchema,
} from '@/app/api/user/validation';

// ----------------------------------------
//
// Login Validation
//
// ----------------------------------------
export const loginSchema = zod.object({
  email: emailSchema.or(userNameSchema),
  password: zod.string().min(1, 'Password is required'),
});

// ----------------------------------------
//
// Register Validation
//
// ----------------------------------------
export const registerServerSchema = zod
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: newUserEmailServerSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    username: newUserNameServerSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const registerSchema = zod
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    username: userNameSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
