import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        /* Text */
        'text-text-input selection:text-text md:text-sm file:text-destructive file:text-sm placeholder:text-text-muted-input',
        /* Background */
        'bg-transparent selection:bg-muted-input file:bg-transparent',
        /* Border */
        'rounded-md border border-input focus-visible:border-ring aria-invalid:border-destructive file:border-0',
        /* Font */
        'file:font-label',
        /* Cursor */
        'disabled:pointer-events-none disabled:cursor-not-allowed',
        /* Ring */
        'focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        /* Outline */
        'outline-none',
        /* Shadow */
        'shadow-md transition-[color,box-shadow] ',
        /* Opacity */
        'disabled:opacity-50 ',
        /* Scaling */
        'h-9 w-full min-w-0 file:h-7',
        /* Spacing */
        'px-3 py-1',
        /* Alignment */
        'flex file:inline-flex',
        /* Miscellaneous */
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

export { Input };
