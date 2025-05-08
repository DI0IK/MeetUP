import { auth } from '@/auth';

export default auth((req) => {
  if (
    !req.auth &&
    req.nextUrl.pathname !== '/login' &&
    process.env.MEETUP_SKIP_LOGIN !== 'true'
  ) {
    const newUrl = new URL('/login', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
