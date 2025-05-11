import React from 'react';

interface ScrollableContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollableSettingsWrapper: React.FC<
  ScrollableContentWrapperProps
> = ({ children, className = '' }) => {
  return (
    <div className={`h-[500px] overflow-y-auto space-y-2 ${className}`}>
      {children}
    </div>
  );
};
