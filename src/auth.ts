import NextAuth, { CredentialsSignin } from 'next-auth';

import { Prisma } from '@/generated/prisma';
import type { Provider } from 'next-auth/providers';

import Credentials from 'next-auth/providers/credentials';
import AuthentikProvider from 'next-auth/providers/authentik';
import DiscordProvider from 'next-auth/providers/discord';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GitlabProvider from 'next-auth/providers/gitlab';
import GoogleProvider from 'next-auth/providers/google';
import KeycloakProvider from 'next-auth/providers/keycloak';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';

import { loginSchema } from '@/lib/auth/validation';
import { ZodError } from 'zod/v4';

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

const providers: Provider[] = [
  !process.env.DISABLE_PASSWORD_LOGIN &&
    Credentials({
      credentials: { password: { label: 'Password', type: 'password' } },
      async authorize(c) {
        if (
          process.env.NODE_ENV === 'development' &&
          process.env.DISABLE_AUTH_TEST_USER !== 'true' &&
          c.password === 'password'
        )
          return {
            id: 'test',
            name: 'Test User',
            email: 'test@example.com',
          };
        if (process.env.DISABLE_PASSWORD_LOGIN) return null;

        try {
          const { email, password } = await loginSchema.parseAsync(c);

          const user = await prisma.user.findFirst({
            where: { OR: [{ email }, { name: email }] },
            include: { accounts: true },
          });

          if (!user)
            throw new InvalidLoginError(
              'username/email or password is not correct',
            );

          if (user.accounts[0].provider !== 'credentials') {
            throw new InvalidLoginError(
              'username/email or password is not correct',
            );
          }

          const passwordsMatch = await (
            await import('bcryptjs')
          ).compare(password, user.password_hash!);

          if (!passwordsMatch) {
            throw new InvalidLoginError(
              'username/email or password is not correct',
            );
          }

          if (!user.emailVerified) {
            throw new InvalidLoginError(
              'Email not verified. Please check your inbox.',
            );
          }

          return user;
        } catch (error) {
          if (
            error instanceof Prisma?.PrismaClientInitializationError ||
            error instanceof Prisma?.PrismaClientKnownRequestError
          ) {
            throw new InvalidLoginError('System error. Please contact support');
          }

          if (error instanceof ZodError) {
            throw new InvalidLoginError(error.issues[0].message);
          }

          throw error;
        }
      },
    }),

  process.env.AUTH_DISCORD_ID && DiscordProvider,
  process.env.AUTH_FACEBOOK_ID && FacebookProvider,
  process.env.AUTH_GITHUB_ID && GithubProvider,
  process.env.AUTH_GITLAB_ID && GitlabProvider,
  process.env.AUTH_GOOGLE_ID && GoogleProvider,
  process.env.AUTH_KEYCLOAK_ID && KeycloakProvider,

  process.env.AUTH_AUTHENTIK_ID &&
    AuthentikProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.preferred_username,
          first_name: profile.given_name.split(' ')[0] || '',
          last_name: profile.given_name.split(' ')[1] || '',
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
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
  providers,
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
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
