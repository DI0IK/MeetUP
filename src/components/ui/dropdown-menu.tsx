'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={cn(
          /* Text */
          'text-text',
          /* Background */
          'bg-popover',
          /* Border */
          'border rounded-md',
          /* Font */
          '',
          /* Cursor */
          '',
          /* Ring */
          '',
          /* Outline */
          '',
          /* Shadow */
          'shadow-md',
          /* Opacity */
          '',
          /* Scaling */
          'max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem]',
          /* Spacing */
          'p-1',
          /* Alignment */
          'z-50 origin-(--radix-dropdown-menu-content-transform-origin)',
          /* Miscellaneous */
          'overflow-x-hidden overflow-y-auto',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          /* ////////// */
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        /* Text */
        'text-sm focus:text-text data-[variant=destructive]:text-destructive',
        'data-[variant=destructive]:focus:text-destructive',
        'data-[variant=destructive]:*:[svg]:!text-destructive',
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        /* Background */
        'focus:bg-popover-hover data-[variant=destructive]:focus:bg-destructive/10',
        'dark:data-[variant=destructive]:focus:bg-destructive/20',
        /* Border */
        'rounded-sm',
        /* Font */
        '',
        /* Cursor */
        'cursor-default data-[disabled]:pointer-events-none data-[inset]:pl-8',
        '[&_svg]:pointer-events-none',
        /* Ring */
        '',
        /* Outline */
        'outline-hidden',
        /* Shadow */
        '',
        /* Opacity */
        'data-[disabled]:opacity-50',
        /* Scaling */
        " [&_svg:not([class*='size-'])]:size-4",
        /* Spacing */
        'gap-2 px-2 py-1.5',
        /* Alignment */
        'relative flex items-center [&_svg]:shrink-0',
        /* Miscellaneous */
        'select-none',
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot='dropdown-menu-checkbox-item'
      className={cn(
        '                ',
        /* Text */
        'focus:text-accent-foreground text-sm',
        /* Background */
        'focus:bg-accent',
        /* Border */
        'rounded-sm',
        /* Font */
        '',
        /* Cursor */
        'cursor-default select-none data-[disabled]:pointer-events-none',
        '[&_svg]:pointer-events-none',
        /* Ring */
        '',
        /* Outline */
        'outline-hidden',
        /* Shadow */
        '',
        /* Opacity */
        'data-[disabled]:opacity-50',
        /* Scaling */
        "[&_svg:not([class*='size-'])]:size-4",
        /* Spacing */
        'gap-2 py-1.5 pr-2 pl-8',
        /* Alignment */
        'relative flex items-center [&_svg]:shrink-0',
        /* Miscellaneous */
        '',
        /* ////////// */
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot='dropdown-menu-radio-group'
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot='dropdown-menu-radio-item'
      className={cn(
        /* Text */
        'focus:text-accent-foreground text-sm',
        /* Background */
        'focus:bg-accent',
        /* Border */
        'rounded-sm',
        /* Font */
        '',
        /* Cursor */
        'cursor-default select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none',
        /* Ring */
        '',
        /* Outline */
        'outline-hidden',
        /* Shadow */
        '',
        /* Opacity */
        'data-[disabled]:opacity-50',
        /* Scaling */
        "[&_svg:not([class*='size-'])]:size-4",
        /* Spacing */
        'gap-2 py-1.5 pr-2 pl-8',
        /* Alignment */
        'relative flex items-center [&_svg]:shrink-0',
        /* Miscellaneous */
        '',
        /* ////////// */
        className,
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot='dropdown-menu-label'
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot='dropdown-menu-sub-trigger'
      data-inset={inset}
      className={cn(
        '            ',
        /* Text */
        'text-sm focus:text-accent-foreground data-[state=open]:text-accent-foreground',
        /* Background */
        'focus:bg-accent data-[state=open]:bg-accent',
        /* Border */
        'rounded-sm',
        /* Font */
        '',
        /* Cursor */
        'cursor-default select-none',
        /* Ring */
        '',
        /* Outline */
        'outline-hidden',
        /* Shadow */
        '',
        /* Opacity */
        '',
        /* Scaling */
        '',
        /* Spacing */
        'px-2 py-1.5 data-[inset]:pl-8',
        /* Alignment */
        'flex items-center',
        /* Miscellaneous */
        '',
        /* ////////// */
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot='dropdown-menu-sub-content'
      className={cn(
        '                ',
        /* Text */
        'text-popover-foreground',
        /* Background */
        'bg-popover',
        /* Border */
        'border rounded-md',
        /* Font */
        '',
        /* Cursor */
        '',
        /* Ring */
        '',
        /* Outline */
        '',
        /* Shadow */
        'shadow-lg',
        /* Opacity */
        '',
        /* Scaling */
        'min-w-[8rem]',
        /* Spacing */
        'p-1',
        /* Alignment */
        'z-50 origin-(--radix-dropdown-menu-content-transform-origin)',
        /* Miscellaneous */
        'overflow-hidden',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        /* ////////// */
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
