'use client';

import { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SettingsDropdown } from '@/components/misc/settings-dropdown';
import { useRouter } from 'next/navigation';
import { useDeleteApiUserMe, useGetApiUserMe } from '@/generated/api/user/user';
import { ThemePicker } from './theme-picker';
import LabeledInput from '../custom-ui/labeled-input';
import { GroupWrapper } from '../wrappers/group-wrapper';

import ProfilePictureUpload from './profile-picture-upload';
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarCheck,
  CalendarClock,
  CalendarCog,
  CalendarPlus,
  CalendarPlus2,
  ClockAlert,
  ClockFading,
  FileKey,
  FileKey2,
  MailOpen,
  RotateCcwKey,
  UserLock,
  UserPen,
} from 'lucide-react';
import { IconButton } from '../buttons/icon-button';

export default function SettingsPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('general');
  const { data } = useGetApiUserMe();
  const deleteUser = useDeleteApiUserMe();

  const renderSettingsContent = () => {
    switch (currentSection) {
      case 'general':
        return (
          <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
            <ScrollableSettingsWrapper>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6 my-2'>
                {/*-------------------- General Settings --------------------*/}
                <GroupWrapper title='General Settings'>
                  <div className='space-y-4'>
                    <div>
                      <LabeledInput
                        type='text'
                        label='First Name'
                        placeholder='First Name'
                        defaultValue={data?.data.user.first_name ?? ''}
                      ></LabeledInput>
                    </div>
                    <div>
                      <LabeledInput
                        type='text'
                        label='Last Name'
                        placeholder='Last Name'
                        defaultValue={data?.data.user.last_name ?? ''}
                      ></LabeledInput>
                    </div>
                    <div className='space-y-2'>
                      <LabeledInput
                        type='text'
                        label='Display Name'
                        icon={UserPen}
                        placeholder='Display Name'
                        defaultValue={data?.data.user.name}
                      ></LabeledInput>
                    </div>
                    <div className='space-y-2 space-b-2'>
                      <LabeledInput
                        type='email'
                        label='Email Address'
                        icon={MailOpen}
                        placeholder='Your E-Mail'
                        defaultValue={data?.data.user.email ?? ''}
                      ></LabeledInput>

                      <span className='text-sm text-muted-foreground'>
                        Email might be managed by your SSO provider.
                      </span>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- General Settings --------------------*/}
                {/*-------------------- Reset Password --------------------*/}
                <GroupWrapper title='Reset Password'>
                  <div className='flex items-center justify-evenly sm:flex-row flex-col gap-6'>
                    <div>
                      <LabeledInput
                        type='password'
                        label='Current Password'
                        icon={FileKey}
                      ></LabeledInput>
                    </div>
                    <div>
                      <LabeledInput
                        type='password'
                        label='New Password'
                        icon={FileKey2}
                      ></LabeledInput>
                    </div>
                    <div>
                      <LabeledInput
                        type='password'
                        label='Repeat Password'
                        icon={RotateCcwKey}
                      ></LabeledInput>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Reset Password --------------------*/}
                {/*-------------------- Profile Picture --------------------*/}
                <GroupWrapper title='Profile Picture'>
                  <div className='space-y-2 grid grid-cols-[1fr_auto]'>
                    <ProfilePictureUpload className='file:border file:rounded-md file:hover:bg-disabled-destructive' />
                  </div>
                </GroupWrapper>
                {/*-------------------- Profile Picture --------------------*/}
                {/*-------------------- Regional Settings --------------------*/}
                <GroupWrapper title='Regional Settings'>
                  <div className='space-y-2 grid sm:grid-cols-[1fr_auto] sm:flex-row gap-4'>
                    <div className='grid gap-1'>
                      <LabeledInput
                        type='text'
                        label='Timezone'
                        placeholder='Europe/Berlin'
                        icon={CalendarClock}
                        defaultValue={data?.data.user.timezone ?? ''}
                      ></LabeledInput>
                    </div>
                    <div>
                      <div className='grid gap-1'>
                        <Label htmlFor='language'>Language</Label>
                        <Select>
                          <SelectTrigger id='language'>
                            <SelectValue placeholder='Select language' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='en'>English</SelectItem>
                            <SelectItem value='de'>German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Regional Settings --------------------*/}
                <GroupWrapper title='DANGER ZONE - INSTANT DELETE - NO CONFIRMATION'>
                  <div className='flex items-center justify-evenly sm:flex-row flex-col gap-6'>
                    <Button
                      onClick={() => {
                        deleteUser.mutate(undefined, {
                          onSuccess: () => {
                            router.push('/api/logout');
                          },
                        });
                      }}
                      variant='destructive'
                    >
                      Delete Account
                    </Button>
                    <span className='text-sm text-muted-foreground pt-1'>
                      Permanently delete your account and all associated data.
                    </span>
                  </div>
                </GroupWrapper>
              </CardContent>
            </ScrollableSettingsWrapper>
          </Card>
        );

      case 'notifications':
        return (
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
                    <Switch id='masterEmailNotifications' />
                  </div>
                </GroupWrapper>
                {/*-------------------- All --------------------*/}
                {/*-------------------- Meetings --------------------*/}
                <GroupWrapper title='Meetings'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between space-x-2'>
                      <Label
                        htmlFor='newMeetingBookings'
                        className='font-normal'
                      >
                        New Meeting Bookings
                      </Label>
                      <Switch id='newMeetingBookings' />
                    </div>
                    <div className='flex items-center justify-between space-x-2'>
                      <Label
                        htmlFor='meetingConfirmations'
                        className='font-normal'
                      >
                        Meeting Confirmations/Cancellations
                      </Label>
                      <Switch id='meetingConfirmations' />
                    </div>
                    <div className='space-y-4 grid grid-cols-[1fr_1fr_auto] items-center'>
                      <div className='flex items-center justify-between space-x-2'>
                        <Label
                          htmlFor='enableMeetingReminders'
                          className='font-normal'
                        >
                          Meeting Reminders
                        </Label>
                      </div>
                      <div>
                        <Label className='text-sm' htmlFor='remindBefore'>
                          Remind me before
                        </Label>
                        <Select>
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
                      <div>
                        <Switch id='enableMeetingReminders' />
                      </div>
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
                      <Switch id='friendRequests' />
                    </div>
                    <div className='flex items-center justify-between space-x-2'>
                      <Label htmlFor='groupUpdates' className='font-normal'>
                        Group Invitations/Updates
                      </Label>
                      <Switch id='groupUpdates' />
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Social --------------------*/}
              </CardContent>
            </ScrollableSettingsWrapper>
          </Card>
        );

      case 'calendarAvailability':
        return (
          <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
            <ScrollableSettingsWrapper>
              <CardHeader>
                <CardTitle>Calendar & Availability</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6 my-2'>
                {/*-------------------- Date & Time Format --------------------*/}
                <GroupWrapper title='Date & Time Format'>
                  <div className='flex flex-col space-y-4'>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='dateFormat'>Date Format</Label>
                      <Select>
                        <SelectTrigger id='dateFormat'>
                          <SelectValue placeholder='Select date format' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='ddmmyyyy'>DD/MM/YYYY</SelectItem>
                          <SelectItem value='mmddyyyy'>MM/DD/YYYY</SelectItem>
                          <SelectItem value='yyyymmdd'>YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='timeFormat'>Time Format</Label>
                      <Select>
                        <SelectTrigger id='timeFormat'>
                          <SelectValue placeholder='Select time format' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='24h'>24-hour</SelectItem>
                          <SelectItem value='12h'>12-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Date & Time Format --------------------*/}
                {/*-------------------- Calendar --------------------*/}
                <GroupWrapper title='Calendar'>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='defaultCalendarView'>
                        Default Calendar View
                      </Label>
                      <Select>
                        <SelectTrigger id='defaultCalendarView'>
                          <SelectValue placeholder='Select view' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='day'>Day</SelectItem>
                          <SelectItem value='week'>Week</SelectItem>
                          <SelectItem value='month'>Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='weekStartsOn'>Week Starts On</Label>
                      <Select>
                        <SelectTrigger id='weekStartsOn'>
                          <SelectValue placeholder='Select day' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='sunday'>Sunday</SelectItem>
                          <SelectItem value='monday'>Monday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='flex items-center justify-between space-x-2'>
                      <Label htmlFor='showWeekends' className='font-normal'>
                        Show Weekends
                      </Label>
                      <Switch id='showWeekends' defaultChecked />
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Calendar --------------------*/}
                {/*-------------------- Availability --------------------*/}
                <GroupWrapper title='Availability'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Working Hours</Label>
                      <span className='text-sm text-muted-foreground'>
                        Define your typical available hours (e.g.,
                        Monday-Friday, 9 AM - 5 PM).
                      </span>
                      <Button variant='outline_muted' size='sm'>
                        Set Working Hours
                      </Button>
                    </div>
                    <div className='space-y-2'>
                      <LabeledInput
                        type='text'
                        label='Minimum Notice for Bookings'
                        icon={ClockAlert}
                        subtext='Min time before a booking can be made.'
                        placeholder='e.g. 1h'
                        defaultValue={''}
                      ></LabeledInput>
                    </div>
                    <div className='space-y-2'>
                      <LabeledInput
                        type='text'
                        label='Booking Window (days in advance)'
                        icon={ClockFading}
                        subtext='Max time in advance a booking can be made.'
                        placeholder='e.g. 30d'
                        defaultValue={''}
                      ></LabeledInput>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Availability --------------------*/}
                {/*-------------------- iCalendar Integration --------------------*/}
                <GroupWrapper title='iCalendar Integration'>
                  <div className='space-y-4'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      className='space-y-2'
                    >
                      <LabeledInput
                        type='url'
                        label='Import iCal Feed URL'
                        icon={CalendarCheck}
                        placeholder='https://calendar.example.com/feed.ics'
                        defaultValue={''}
                        name='icalUrl'
                        required
                      ></LabeledInput>
                      <IconButton
                        type='submit'
                        size='sm'
                        className='mt-1'
                        variant={'secondary'}
                        icon={CalendarPlus}
                        title='Submit iCal URL'
                      >
                        Add Feed
                      </IconButton>
                    </form>
                    <div className='space-y-2'>
                      <Label>Export Your Calendar</Label>
                      <IconButton
                        variant='outline_muted'
                        size='sm'
                        icon={CalendarArrowUp}
                      >
                        Get iCal Export URL
                      </IconButton>
                      <IconButton
                        variant='outline_muted'
                        size='sm'
                        className='ml-2'
                        icon={CalendarArrowDown}
                      >
                        Download .ics File
                      </IconButton>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- iCalendar Integration --------------------*/}
              </CardContent>
            </ScrollableSettingsWrapper>
          </Card>
        );

      case 'sharingPrivacy':
        return (
          <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
            <ScrollableSettingsWrapper>
              <CardHeader>
                <CardTitle>Sharing & Privacy</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6 my-2'>
                {/*-------------------- Privacy Settigs --------------------*/}
                <GroupWrapper title='Privacy Settings'>
                  <div className='flex flex-col space-y-4'>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='defaultVisibility'>
                        Default Calendar Visibility
                      </Label>
                      <span className='text-sm text-muted-foreground'>
                        Default setting for new friends.
                      </span>
                      <Select>
                        <SelectTrigger id='defaultVisibility'>
                          <SelectValue placeholder='Select visibility' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='private'>
                            Private (Only You)
                          </SelectItem>
                          <SelectItem value='freebusy'>Free/Busy</SelectItem>
                          <SelectItem value='fulldetails'>
                            Full Details
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='whoCanSeeFull'>
                        Who Can See Your Full Calendar Details?
                      </Label>
                      <span className='text-sm text-muted-foreground'>
                        (Override for Default Visibility)
                        <br />
                        <span className='text-sm text-muted-foreground'>
                          This setting will override the default visibility for
                          your calendar. You can set specific friends or groups
                          to see your full calendar details.
                        </span>
                      </span>
                      <Select>
                        <SelectTrigger id='whoCanSeeFull'>
                          <SelectValue placeholder='Select audience' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='me'>Only Me</SelectItem>
                          <SelectItem value='friends'>My Friends</SelectItem>
                          <SelectItem value='specific'>
                            Specific Friends/Groups (manage separately)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label htmlFor='whoCanBook'>
                        Who Can Book Time With You?
                      </Label>
                      <Select>
                        <SelectTrigger id='whoCanBook'>
                          <SelectValue placeholder='Select audience' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='none'>No One</SelectItem>
                          <SelectItem value='friends'>My Friends</SelectItem>
                          <SelectItem value='specific'>
                            Specific Friends/Groups (manage separately)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-1 gap-1'>
                        <Label>Blocked Users</Label>
                        <span className='text-sm text-muted-foreground'>
                          Prevent specific users from seeing your calendar or
                          booking time.
                        </span>
                        <IconButton
                          variant='outline_muted'
                          size='sm'
                          icon={UserLock}
                        >
                          Manage Blocked Users
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </GroupWrapper>
                {/*-------------------- Privacy Settigs --------------------*/}
              </CardContent>
            </ScrollableSettingsWrapper>
          </Card>
        );

      case 'appearance':
        return (
          <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
            <ScrollableSettingsWrapper>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6 my-2'>
                {/*-------------------- Change Theme --------------------*/}
                <GroupWrapper title='Change Theme'>
                  <div className='space-y-2'>
                    <Label htmlFor='theme'>Theme</Label>
                    <ThemePicker />
                  </div>
                </GroupWrapper>
                {/*-------------------- Change Theme --------------------*/}
              </CardContent>
            </ScrollableSettingsWrapper>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm'>
      <div className='rounded-lg border bg-card text-card-foreground shadow-xl max-w-[700px] w-full h-auto max-h-[calc(100vh-2rem)] flex flex-col'>
        <div className='p-6 border-b'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-semibold'>Settings</h1>
          </div>
          <SettingsDropdown
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
        </div>

        <div className='flex-grow overflow-auto'>{renderSettingsContent()}</div>
        <div>
          <CardFooter className='border-t h-[60px] flex content-center justify-between'>
            <Button onClick={() => router.back()} variant='secondary'>
              Exit
            </Button>
            <Button variant='primary'>Save Changes</Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
