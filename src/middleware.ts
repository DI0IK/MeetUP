export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon-96x96.png|favicon.svg|site.webmanifest|web-app-manifest-192x192.png|web-app-manifest-512x512.png|favicon-dark.svg|favicon-light.svg|favicon-light.png|favicon-dark.png).*)',
  ],
};
