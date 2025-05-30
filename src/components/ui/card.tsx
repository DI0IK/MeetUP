import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        /* Text */
        'text-card-foreground',
        /* Background */
        'bg-card',
        /* Border */
        'border rounded-xl',
        /* Font */
        '',
        /* Cursor */
        '',
        /* Ring */
        '',
        /* Outline */
        '',
        /* Shadow */
        'shadow-sm',
        /* Opacity */
        '',
        /* Scaling */
        '',
        /* Spacing */
        'py-6 gap-6',
        /* Alignment */
        'flex flex-col',
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        /* Text */
        '',
        /* Background */
        '',
        /* Border */
        '',
        /* Font */
        '',
        /* Cursor */
        '',
        /* Ring */
        '',
        /* Outline */
        '',
        /* Shadow */
        '',
        /* Opacity */
        '',
        /* Scaling */
        '',
        /* Spacing */
        'gap-1.5 px-6 [.border-b]:pb-6',
        /* Alignment */
        'grid auto-rows-min grid-rows-[auto_auto]',
        'items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        /* Miscellanneous */
        '@container/card-header',
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
