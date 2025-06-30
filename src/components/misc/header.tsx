import { SidebarTrigger } from '@/components/custom-ui/sidebar';
import { ThemePicker } from '@/components/misc/theme-picker';
import { NotificationButton } from '@/components/buttons/notification-button';

import { BellRing, Inbox } from 'lucide-react';
import UserDropdown from '@/components/misc/user-dropdown';

const items = [
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Notifications',
    url: '#',
    icon: BellRing,
  },
];

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full grid grid-rows-[50px_1fr] h-screen'>
      <header className='border-b-1 grid-cols-[1fr_3fr_1fr] grid items-center px-2 shadow-md'>
        <span className='flex justify-start'>
          <SidebarTrigger variant='outline_primary' size='icon' />
        </span>
        <span className='flex justify-center'>Search</span>
        <span className='flex gap-1 justify-end'>
          <ThemePicker />
          {items.map((item) => (
            <NotificationButton
              disabled
              key={item.title}
              variant='outline_muted'
              dotVariant='hidden'
              size='icon'
            >
              <item.icon />
            </NotificationButton>
          ))}
          <UserDropdown />
        </span>
      </header>
      <main className='max-h-full overflow-y-auto p-5'>{children}</main>
    </div>
  );
}
