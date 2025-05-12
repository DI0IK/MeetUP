import NextAuth from 'next-auth';
import Authentik from 'next-auth/providers/authentik';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [process.env.AUTH_AUTHENTIK_ISSUER ? Authentik : null].filter(
    (x) => x !== null,
  ),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/login',
  },
});
