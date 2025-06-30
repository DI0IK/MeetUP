'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  const [shouldExpand, setShouldExpand] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    const handleScreenSizeChange = () => {
      setShouldExpand(mediaQuery.matches);
    };

    handleScreenSizeChange(); // set initial value
    mediaQuery.addEventListener('change', handleScreenSizeChange);

    return () =>
      mediaQuery.removeEventListener('change', handleScreenSizeChange);
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      richColors={true}
      className='toaster group'
      toastOptions={{
        style: {
          backgroundColor: 'var(--color-neutral-150)',
          color: 'var(--color-text-alt)',
          borderRadius: 'var(--radius)',
        },
        cancelButtonStyle: {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-text-alt)',
        },
        actionButtonStyle: {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-text-alt)',
        },
      }}
      swipeDirections={['left', 'right']}
      closeButton={true}
      expand={shouldExpand}
      {...props}
    />
  );
};

export { Toaster };
