import NextAuth from 'next-auth';

import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';

import Authentik from 'next-auth/providers/authentik';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';

const providers: Provider[] = [
  !process.env.DISABLE_PASSWORD_LOGIN &&
    Credentials({
      credentials: { password: { label: 'Password', type: 'password' } },
      authorize(c) {
        if (c.password !== 'password') return null;
        return {
          id: 'test',
          name: 'Test User',
          email: 'test@example.com',
        };
      },
    }),
  process.env.AUTH_AUTHENTIK_ID && Authentik,
].filter(Boolean) as Provider[];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
