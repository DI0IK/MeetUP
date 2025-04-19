import { handlers } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export const { GET, POST } = handlers;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
