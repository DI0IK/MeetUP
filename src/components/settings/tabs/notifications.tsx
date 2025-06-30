'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { ScrollableSettingsWrapper } from '@/components/wrappers/settings-scroll';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GroupWrapper } from '@/components/wrappers/group-wrapper';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

export default function NotificationsTab() {
  const router = useRouter();
  return (
    <>
      <div className='flex-grow overflow-auto'>
        <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
          <ScrollableSettingsWrapper>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 my-2'>
              {/*-------------------- All --------------------*/}
              <GroupWrapper title='All'>
                <div className='flex items-center justify-between'>
                  <Label
                    htmlFor='masterEmailNotifications'
                    className='font-normal'
                  >
                    Enable All Email Notifications
                  </Label>
                  <Switch id='masterEmailNotifications' disabled />
                </div>
              </GroupWrapper>
              {/*-------------------- All --------------------*/}
              {/*-------------------- Meetings --------------------*/}
              <GroupWrapper title='Meetings'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between space-x-2'>
                    <Label htmlFor='newMeetingBookings' className='font-normal'>
                      New Meeting Bookings
                    </Label>
                    <Switch id='newMeetingBookings' disabled />
                  </div>
                  <div className='flex items-center justify-between space-x-2'>
                    <Label
                      htmlFor='meetingConfirmations'
                      className='font-normal'
                    >
                      Meeting Confirmations/Cancellations
                    </Label>
                    <Switch id='meetingConfirmations' disabled />
                  </div>
                  <div className='flex items-center justify-between space-x-2'>
                    <Label
                      htmlFor='enableMeetingReminders'
                      className='font-normal'
                    >
                      Meeting Reminders
                    </Label>
                    <div>
                      <Switch id='enableMeetingReminders' disabled />
                    </div>
                  </div>

                  <div className='flex items-center justify-between space-x-2'>
                    <Label className='font-normal' htmlFor='remindBefore'>
                      Remind me before
                    </Label>
                    <Select disabled>
                      <SelectTrigger id='remindBefore'>
                        <SelectValue placeholder='Select reminder time' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='15m'>15 minutes</SelectItem>
                        <SelectItem value='30m'>30 minutes</SelectItem>
                        <SelectItem value='1h'>1 hour</SelectItem>
                        <SelectItem value='1d'>1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </GroupWrapper>
              {/*-------------------- Meetings --------------------*/}
              {/*-------------------- Social --------------------*/}
              <GroupWrapper title='Social'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between space-x-2'>
                    <Label htmlFor='friendRequests' className='font-normal'>
                      Friend Requests
                    </Label>
                    <Switch id='friendRequests' disabled />
                  </div>
                  <div className='flex items-center justify-between space-x-2'>
                    <Label htmlFor='groupUpdates' className='font-normal'>
                      Group Invitations/Updates
                    </Label>
                    <Switch id='groupUpdates' disabled />
                  </div>
                </div>
              </GroupWrapper>
              {/*-------------------- Social --------------------*/}
            </CardContent>
          </ScrollableSettingsWrapper>
        </Card>
      </div>
      <div>
        <CardFooter className='border-t h-[60px] flex content-center justify-between'>
          <Button
            onClick={() => router.back()}
            variant='secondary'
            type='button'
          >
            Exit
          </Button>
          <Button variant='primary'>Save Changes</Button>
        </CardFooter>
      </div>
    </>
  );
}
