import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { prisma } from '@/prisma';
import zod from 'zod/v4';
import { allTimeZones } from '@/lib/timezones';

extendZodWithOpenApi(zod);

// ----------------------------------------
//
// Email Validation
//
// ----------------------------------------
export const emailSchema = zod
  .email('Invalid email address')
  .min(3, 'Email is required');

export const newUserEmailServerSchema = emailSchema.refine(async (val) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: val },
  });
  return !existingUser;
}, 'Email in use by another account');

export const existingUserEmailServerSchema = emailSchema.refine(async (val) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: val },
  });
  return !!existingUser;
}, 'Email not found');

// ----------------------------------------
//
// First Name Validation
//
// ----------------------------------------
export const firstNameSchema = zod
  .string()
  .min(1, 'First name is required')
  .max(32, 'First name must be at most 32 characters long');

// ----------------------------------------
//
// Last Name Validation
//
// ----------------------------------------
export const lastNameSchema = zod
  .string()
  .min(1, 'Last name is required')
  .max(32, 'Last name must be at most 32 characters long');

// ----------------------------------------
//
// Username Validation
//
// ----------------------------------------
export const userNameSchema = zod
  .string()
  .min(3, 'Username is required')
  .max(32, 'Username must be at most 32 characters long')
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores',
  );

export const newUserNameServerSchema = userNameSchema.refine(async (val) => {
  const existingUser = await prisma.user.findUnique({
    where: { name: val },
  });
  return !existingUser;
}, 'Username in use by another account');

export const existingUserNameServerSchema = userNameSchema.refine(
  async (val) => {
    const existingUser = await prisma.user.findUnique({
      where: { name: val },
    });
    return !!existingUser;
  },
  'Username not found',
);

// ----------------------------------------
//
// User ID Validation
//
// ----------------------------------------
export const existingUserIdServerSchema = zod
  .string()
  .min(1, 'User ID is required')
  .refine(async (val) => {
    const user = await prisma.user.findUnique({
      where: { id: val },
    });
    return !!user;
  }, 'User not found');

// ----------------------------------------
//
// Password Validation
//
// ----------------------------------------
export const passwordSchema = zod
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must be at most 128 characters long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  );

// ----------------------------------------
//
// Timezone Validation
//
// ----------------------------------------
export const timezoneSchema = zod
  .enum(allTimeZones)
  .openapi('Timezone', {
    description: 'Valid timezone from the list of supported timezones',
  });

// ----------------------------------------
//
// User Schema Validation (for API responses)
//
// ----------------------------------------
export const FullUserSchema = zod
  .object({
    id: zod.string(),
    name: zod.string(),
    first_name: zod.string().nullish(),
    last_name: zod.string().nullish(),
    email: zod.email(),
    image: zod.url().nullish(),
    timezone: zod.string().refine((i) => (allTimeZones as string[]).includes(i)).nullish(),
    created_at: zod.date(),
    updated_at: zod.date(),
  })
  .openapi('FullUser', {
    description: 'Full user information including all fields',
  });

export const PublicUserSchema = FullUserSchema.pick({
  id: true,
  name: true,
  first_name: true,
  last_name: true,
  image: true,
  timezone: true,
}).openapi('PublicUser', {
  description: 'Public user information excluding sensitive data',
});

export const FullUserResponseSchema = zod.object({
  success: zod.boolean(),
  user: FullUserSchema,
});
export const PublicUserResponseSchema = zod.object({
  success: zod.boolean(),
  user: PublicUserSchema,
});
