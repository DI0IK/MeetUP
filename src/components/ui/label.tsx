'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        /* Text */
        'text-sm',
        /* Background */
        '',
        /* Border */
        '',
        /* Font */
        'font-label',
        /* Cursor */
        'group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
        /* Ring */
        '',
        /* Outline */
        '',
        /* Shadow */
        '',
        /* Opacity */
        'group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50',
        /* Scaling */
        '',
        /* Spacing */
        'gap-2',
        /* Alignment */
        'flex items-center',
        /* Miscellaneous */
        'select-none leading-none',
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

export { Label };
