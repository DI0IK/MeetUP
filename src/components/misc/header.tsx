'use client';

import { SidebarTrigger } from '@/components/custom-ui/sidebar';
import { ThemePicker } from '@/components/misc/theme-picker';
import { NotificationButton } from '@/components/buttons/notification-button';

import { BellRing, Inbox } from 'lucide-react';
import UserDropdown from '@/components/misc/user-dropdown';
import {
  useGetApiNotifications,
  usePatchApiNotificationsNotification,
} from '@/generated/api/notifications/notifications';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {
    data: notifications,
    isLoading: notificationsLoading,
    refetch,
  } = useGetApiNotifications();

  const markNotificationAsRead = usePatchApiNotificationsNotification();

  return (
    <div className='w-full grid grid-rows-[50px_1fr] h-screen'>
      <header className='border-b-1 grid-cols-[1fr_3fr_1fr] grid items-center px-2 shadow-md'>
        <span className='flex justify-start'>
          <SidebarTrigger variant='outline_primary' size='icon' />
        </span>
        <span className='flex justify-center'>Search</span>
        <span className='flex gap-1 justify-end'>
          <ThemePicker />
          <NotificationButton
            variant='outline_primary'
            dotVariant={
              !notificationsLoading && notifications?.data.unread_count
                ? 'active'
                : notifications?.data.notifications.length
                  ? 'neutral'
                  : 'hidden'
            }
            size='icon'
            icon={<Inbox />}
          >
            <DropdownMenuItem>
              {notificationsLoading
                ? 'Loading...'
                : `${notifications?.data.unread_count} unread Notifications`}
            </DropdownMenuItem>
            {notifications?.data.notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn('grid grid-rows-[auto-auto-auto] gap-2', {
                  'font-bold': !notification.is_read,
                })}
              >
                <p className='text-sm'>{notification.message}</p>
                <p className='text-xs text-gray-500'>
                  {new Date(notification.created_at).toLocaleString()}
                </p>
                <div className='grid auto-cols-fr grid-flow-col gap-2'>
                  <Button
                    onClick={() => {
                      markNotificationAsRead.mutate(
                        {
                          notification: notification.id,
                          data: {
                            is_read: !notification.is_read,
                          },
                        },
                        {
                          onSuccess: () => {
                            refetch();
                          },
                        },
                      );
                    }}
                    variant={
                      notification.is_read ? 'outline_primary' : 'primary'
                    }
                  >
                    {notification.is_read ? 'Read' : 'Mark as Read'}
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    switch (notification.related_entity_type) {
                      case "MEETING":
                        router.push(`/events/${notification.related_entity_id}`);
                        break;
                      case "USER":
                        router.push(`/users/${notification.related_entity_id}`);
                        break;
                      case "GROUP":
                        router.push(`/groups/${notification.related_entity_id}`);
                        break;
                      default:
                        console.warn('Unknown notification type:', notification.related_entity_type);
                        break;
                    }
                  }}>
                    View Details
                  </Button>
                </div>
              </DropdownMenuItem>
            ))}
          </NotificationButton>
          <NotificationButton
            variant='outline_primary'
            dotVariant='hidden'
            size='icon'
            icon={<BellRing />}
          ></NotificationButton>
          <UserDropdown />
        </span>
      </header>
      <main className='max-h-full overflow-y-auto p-5'>{children}</main>
    </div>
  );
}
