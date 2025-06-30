import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center space-y-6 px-4'>
        <div className='space-y-2'>
          <h1 className='text-9xl font-bold text-primary'>404</h1>
          <h2 className='text-3xl font-semibold text-text'>Page Not Found</h2>
          <p className='text-lg text-text-muted max-w-md mx-auto'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or doesn&apos;t exist.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button asChild className='px-8'>
            <Link href='/'>Go Home</Link>
          </Button>
          <Button variant='outline_primary' asChild className='px-8'>
            <Link href='/events'>Browse Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
