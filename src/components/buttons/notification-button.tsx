import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NDot, NotificationDot } from '@/components/misc/notification-dot';

export function NotificationButton({
  dotVariant,
  children,
  ...props
}: {
  dotVariant?: NDot;
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type='button' variant='outline_primary' {...props}>
          {children}
          <NotificationDot
            dotVariant={dotVariant}
            className='absolute ml-[30px] mt-[30px]'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'></DropdownMenuContent>
    </DropdownMenu>
  );
}
