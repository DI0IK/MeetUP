import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "radius-lg inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-button transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-text shadow-xs hover:bg-hover-primary active:bg-active-primary disabled:bg-disabled-primary',
        secondary:
          'bg-secondary text-text-alt shadow-xs hover:bg-hover-secondary active:bg-active-secondary disabled:bg-disabled-secondary',
        muted:
          'bg-muted text-text shadow-xs hover:bg-hover-muted active:bg-active-muted disabled:bg-disabled-muted',
        outline_primary:
          'bg-background border-2 text-text shadow-xs hover:bg-primary border-primary hover:border-background-reversed active:bg-active-primary disabled:bg-disabled-primary',
        outline_secondary:
          'bg-background border-2 text-text shadow-xs hover:bg-secondary border-secondary hover:border-background-reversed active:bg-active-secondary disabled:bg-disabled-secondary',
        outline_muted:
          'bg-background border-2 text-text shadow-xs hover:bg-muted border-muted hover:border-background-reversed active:bg-active-muted disabled:bg-disabled-muted',
        link: 'text-text underline-offset-4 hover:underline',
        calendar:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 w-32 justify-between font-normal',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        destructive:
          'bg-destructive text-text shadow-xs hover:bg-hover-destructive active:bg-active-destructive disabled:bg-disabled-destructive',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
