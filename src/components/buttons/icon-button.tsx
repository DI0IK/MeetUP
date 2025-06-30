import { Button } from '@/components/ui/button';
import { LucideProps } from 'lucide-react';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

export function IconButton({
  icon,
  children,
  ...props
}: {
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button type='button' variant='secondary' {...props}>
      {icon && React.createElement(icon, { className: 'mr-2' })}
      {children}
    </Button>
  );
}
