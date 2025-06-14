'use server';

import type { z } from 'zod';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validation/user';
import { prisma } from '@/prisma';

export async function registerAction(data: z.infer<typeof registerSchema>) {
  try {
    const result = await registerSchema.safeParseAsync(data);

    if (!result.success) {
      return {
        error: result.error.errors[0].message,
      };
    }

    const { email, password, firstName, lastName, username } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        error: 'User already exist with this email',
      };
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });

    if (existingUsername) {
      return {
        error: 'Username already exists',
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.$transaction(async (tx) => {
      const { id } = await tx.user.create({
        data: {
          email,
          name: username,
          password_hash: passwordHash,
          first_name: firstName,
          last_name: lastName,
          emailVerified: new Date(), // TODO: handle email verification
        },
      });

      await tx.account.create({
        data: {
          userId: id,
          type: 'credentials',
          provider: 'credentials',
          providerAccountId: id,
        },
      });
    });

    return {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return {
      error: 'System error. Please contact support',
    };
  }
}
