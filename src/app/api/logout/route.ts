import { signOut } from '@/auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
  await signOut();

  return NextResponse.redirect('/login');
};
