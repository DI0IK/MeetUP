'use server';

import bcrypt from 'bcryptjs';
import type { z } from 'zod/v4';

import { prisma } from '@/prisma';

import { registerServerSchema } from './validation';

export async function registerAction(
  data: z.infer<typeof registerServerSchema>,
) {
  try {
    const result = await registerServerSchema.safeParseAsync(data);

    if (!result.success) {
      return {
        error: result.error.issues[0].message,
      };
    }

    const { email, password, firstName, lastName, username } = result.data;

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
