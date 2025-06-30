import { cn } from '@/lib/utils';
import type * as React from 'react';

interface ScrollableSettingsWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export function ScrollableSettingsWrapper({
  className,
  children,
}: ScrollableSettingsWrapperProps) {
  return (
    <div className={cn('overflow-y-auto h-full', className)}>{children}</div>
  );
}
