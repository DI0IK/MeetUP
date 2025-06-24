import { cn } from '@/lib/utils';
import type * as React from 'react';

interface ScrollableSettingsWrapperProps {
  className?: string;
  legend?: string;
  children: React.ReactNode;
}

export function GroupWrapper({
  className,
  legend,
  children,
}: ScrollableSettingsWrapperProps) {
  return (
    <fieldset
      className={cn('space-t-4 p-4 border rounded-md shadow-md', className)}
    >
      <legend className='text-sm font-medium px-1'>{legend}</legend>
      {children}
    </fieldset>
  );
}
