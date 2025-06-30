'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        '      ',
        /* Text */
        'text-muted-foreground',
        /* Background */
        'bg-muted',
        /* Border */
        'rounded-lg',
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
        'h-9 w-fit',
        /* Spacing */
        'p-[3px]',
        /* Alignment */
        'inline-flex items-center justify-center',
        /* Miscellaneous */
        '',
        /* ////////// */ className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        /* Text */
        'text-sm dark:data-[state=active]:text-foreground text-foreground dark:text-muted-foreground',
        /* Background */
        'data-[state=active]:bg-background dark:data-[state=active]:bg-input/30',
        /* Border */
        'border rounded-md focus-visible:border-ring dark:data-[state=active]:border-input',
        'border-transparent',
        /* Font */
        'font-medium',
        /* Cursor */
        'disabled:pointer-events-none [&_svg]:pointer-events-none',
        /* Ring */
        'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        /* Outline */
        'focus-visible:outline-ring focus-visible:outline-1',
        /* Shadow */
        'data-[state=active]:shadow-sm',
        /* Opacity */
        'disabled:opacity-50',
        /* Scaling */
        "h-[calc(100%-1px)] [&_svg:not([class*='size-'])]:size-4",
        /* Spacing */
        'gap-1.5 px-2 py-1 [&_svg]:shrink-0',
        /* Alignment */
        'inline-flex flex-1 items-center justify-center whitespace-nowrap',
        'transition-[color,box-shadow]',
        /* Miscellaneous */
        '',
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
