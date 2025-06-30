// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { PrismaClient } from '../../src/generated/prisma';

const prisma = new PrismaClient();

export default async function requireUser() {
  await prisma.$transaction(async (tx) => {
    const { id } = await tx.user.create({
      data: {
        email: 'cypress@example.com',
        name: 'cypress',
        password_hash:
          '$2a$10$FmkVRHXzMb63dLHHwG1mDOepZJirL.U964wU/3Xr7cFis8XdRh8sO',
        first_name: 'Cypress',
        last_name: 'Tester',
        emailVerified: new Date(),
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
}
requireUser();
