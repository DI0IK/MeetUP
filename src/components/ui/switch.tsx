'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        /* Text */
        '',
        /* Background */
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring dark:data-[state=unchecked]:bg-input/80',
        /* Border */
        'border border-transparent rounded-full',
        /* Font */
        '',
        /* Cursor */
        'disabled:cursor-not-allowed',
        /* Ring */
        'focus-visible:ring-ring/50',
        /* Outline */
        'outline-none',
        /* Shadow */
        'shadow-xs',
        /* Opacity */
        'disabled:opacity-50',
        /* Scaling */
        'h-[1.15rem] w-8',
        /* Spacing */
        '',
        /* Alignment */
        'inline-flex shrink-0 items-center',
        /* Miscellaneous */
        'peer transition-all focus-visible:ring-[3px]',
        /* ////////// */
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          /* Text */
          '',
          /* Background */
          'bg-background dark:data-[state=unchecked]:bg-foreground',
          'dark:data-[state=checked]:bg-primary-foreground',
          /* Border */
          'rounded-full',
          /* Font */
          '',
          /* Cursor */
          'pointer-events-none',
          /* Ring */
          'ring-0',
          /* Outline */
          '',
          /* Shadow */
          '',
          /* Opacity */
          '',
          /* Scaling */
          'size-4',
          /* Spacing */
          '',
          /* Alignment */
          '',
          /* Miscellaneous */
          'block transition-transform data-[state=checked]:translate-x-[calc(100%-2px)]',
          'data-[state=unchecked]:translate-x-0',
          /* ////////// */
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
