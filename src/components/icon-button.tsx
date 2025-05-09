import { Button } from '@/components/ui/button';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function IconButton({
  icon,
  children,
  ...props
}: {
  icon: IconProp;
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button type='button' variant='default' {...props}>
      <FontAwesomeIcon icon={icon} className='mr-2' />
      {children}
    </Button>
  );
}
