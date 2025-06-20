export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/((?!api|_next/static|api-doc|_next/image|site\.webmanifest|web-app-manifest-(?:192x192|512x512)\.png|apple-touch-icon.png|favicon(?:-(?:dark|light))?\.(?:png|svg|ico)|fonts).*)',
  ],
};
