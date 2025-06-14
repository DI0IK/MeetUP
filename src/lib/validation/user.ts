import zod from 'zod';

export const loginSchema = zod.object({
  email: zod
    .string()
    .email('Invalid email address')
    .min(3, 'Email is required')
    .or(
      zod
        .string()
        .min(3, 'Username is required')
        .max(32, 'Username must be at most 32 characters long')
        .regex(
          /^[a-zA-Z0-9_]+$/,
          'Username can only contain letters, numbers, and underscores',
        ),
    ),
  password: zod.string().min(1, 'Password is required'),
});

export const registerSchema = zod
  .object({
    firstName: zod
      .string()
      .min(1, 'First name is required')
      .max(32, 'First name must be at most 32 characters long'),
    lastName: zod
      .string()
      .min(1, 'Last name is required')
      .max(32, 'Last name must be at most 32 characters long'),
    email: zod
      .string()
      .email('Invalid email address')
      .min(3, 'Email is required'),
    password: zod
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(128, 'Password must be at most 128 characters long'),
    confirmPassword: zod
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(128, 'Password must be at most 128 characters long'),
    username: zod
      .string()
      .min(3, 'Username is required')
      .max(32, 'Username must be at most 32 characters long')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) =>
      !data.password.includes(data.firstName) &&
      !data.password.includes(data.lastName) &&
      !data.password.includes(data.email) &&
      !data.password.includes(data.username),
    {
      message:
        'Password cannot contain your first name, last name, email, or username',
      path: ['password'],
    },
  );
