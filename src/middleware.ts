export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|site.webmanifest|web-app-manifest-192x192.png|web-app-manifest-512x512.png|favicon-(?:dark|light)?\.(?:png|svg)).*)',
  ],
};
