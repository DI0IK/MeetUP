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
import { Input } from '@/components/ui/input';
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
import { useGetApiUserMe } from '@/generated/api/user/user';
import { ThemePicker } from './theme-picker';
import LabeledInput from '../custom-ui/labeled-input';
import { GroupWrapper } from '../wrappers/group-wrapper';

import ProfilePictureUpload from './profile-picture-upload';

export default function SettingsPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('general');
  const { data } = useGetApiUserMe();

  const renderSettingsContent = () => {
    switch (currentSection) {
      case 'general':
        return (
          <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
            <ScrollableSettingsWrapper>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6 mt-2'>
                <GroupWrapper title='General Settings'>
                  <div className='space-y-4'>
                    <div>
                      <LabeledInput
                        label='First Name'
                        type='text'
                        placeholder='First Name'
                        defaultValue={data?.data.user.first_name ?? ''}
                      ></LabeledInput>
                    </div>
                    <div>
                      <LabeledInput
                        label='Last Name'
                        type='text'
                        placeholder='Last Name'
                        defaultValue={data?.data.user.last_name ?? ''}
                      ></LabeledInput>
                    </div>
                    <div className='space-y-2'>
                      <LabeledInput
                        label='Display Name'
                        type='text'
                        placeholder='Display Name'
                        defaultValue={data?.data.user.name}
                      ></LabeledInput>
                    </div>
                    <div className='space-y-2 space-b-2'>
                      <LabeledInput
                        type='email'
                        label='Email Address'
                        placeholder='Your E-Mail'
                        defaultValue={data?.data.user.email ?? ''}
                      ></LabeledInput>

                      <span className='text-sm text-muted-foreground'>
                        Email might be managed by your SSO provider.
                      </span>
                    </div>
                  </div>
                </GroupWrapper>
                <GroupWrapper title='Reset Password'>
                  <div className='flex items-center justify-evenly sm:flex-row flex-col gap-6'>
                    <div>
                      <LabeledInput
                        type='password'
                        label='Current Password'
                        placeholder='Current Password'
                        defaultValue={data?.data.user.first_name ?? ''}
                      ></LabeledInput>
                    </div>
                    <div>
                      <LabeledInput
                        type='password'
                        label='New Password'
                        placeholder='New Password'
                        defaultValue={data?.data.user.first_name ?? ''}
                      ></LabeledInput>
                    </div>
                    <div>
                      <LabeledInput
                        type='password'
                        label='Repeat Password'
                        placeholder='Repeat Password'
                        defaultValue={data?.data.user.first_name ?? ''}
                      ></LabeledInput>
                    </div>
                  </div>
                </GroupWrapper>
                <GroupWrapper title='Profile Picture'>
                  <div className='space-y-2 grid grid-cols-[1fr_auto]'>
                    <ProfilePictureUpload className='file:border file:rounded-md file:hover:bg-disabled-destructive' />
                  </div>
                </GroupWrapper>
                <GroupWrapper title='Regional Settings'>
                  <div className='space-y-2 grid sm:grid-cols-[1fr_auto] sm:flex-row gap-4'>
                    <div className='grid gap-1'>
                      <LabeledInput
                        type='text'
                        label='Timezone'
                        placeholder='Europe/Berlin'
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
                <div className='flex items-center justify-evenly sm:flex-row flex-col gap-6'>
                  <Button
                    // onClick={() => DeleteAccount }
                    variant='destructive'
                  >
                    Delete Account
                  </Button>
                  <span className='text-sm text-muted-foreground pt-1'>
                    Permanently delete your account and all associated data.
                  </span>
                </div>
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
              <CardContent className='space-y-6'>
                <GroupWrapper>
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
              <CardContent className='space-y-6'>
                <fieldset className='space-y-4 p-4 border rounded-md'>
                  <legend className='text-sm font-medium px-1'>Display</legend>
                  <div className='space-y-2'>
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
                  <div className='space-y-2'>
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
                </fieldset>

                <fieldset className='space-y-4 p-4 border rounded-md'>
                  <legend className='text-sm font-medium px-1'>
                    Availability
                  </legend>
                  <div className='space-y-2'>
                    <Label>Working Hours</Label>
                    <span className='text-sm text-muted-foreground'>
                      Define your typical available hours (e.g., Monday-Friday,
                      9 AM - 5 PM).
                    </span>
                    <Button variant='outline_muted' size='sm'>
                      Set Working Hours
                    </Button>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='minNoticeBooking'>
                      Minimum Notice for Bookings
                    </Label>
                    <span className='text-sm text-muted-foreground'>
                      Min time before a booking can be made.
                    </span>
                    <div className='space-y-2'>
                      <Input
                        id='bookingWindow'
                        type='text'
                        placeholder='e.g., 1h'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='bookingWindow'>
                      Booking Window (days in advance)
                    </Label>
                    <span className='text-sm text-muted-foreground'>
                      Max time in advance a booking can be made.
                    </span>
                    <Input
                      id='bookingWindow'
                      type='number'
                      placeholder='e.g., 30d'
                    />
                  </div>
                </fieldset>

                <fieldset className='space-y-4 p-4 border rounded-md'>
                  <legend className='text-sm font-medium px-1'>
                    iCalendar Integration
                  </legend>
                  <div className='space-y-2'>
                    <Label htmlFor='icalImport'>Import iCal Feed URL</Label>
                    <Input
                      id='icalImport'
                      type='url'
                      placeholder='https://calendar.example.com/feed.ics'
                    />
                    <Button size='sm' className='mt-1'>
                      Add Feed
                    </Button>
                  </div>
                  <div className='space-y-2'>
                    <Label>Export Your Calendar</Label>
                    <Button variant='outline_muted' size='sm'>
                      Get iCal Export URL
                    </Button>
                    <Button variant='outline_muted' size='sm' className='ml-2'>
                      Download .ics File
                    </Button>
                  </div>
                </fieldset>
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
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='defaultVisibility'>
                    Default Calendar Visibility
                  </Label>
                  <Select>
                    <SelectTrigger id='defaultVisibility'>
                      <SelectValue placeholder='Select visibility' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='private'>
                        Private (Only You)
                      </SelectItem>
                      <SelectItem value='freebusy'>
                        Free/Busy for Friends
                      </SelectItem>
                      <SelectItem value='fulldetails'>
                        Full Details for Friends
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='whoCanSeeFull'>
                    Who Can See Your Full Calendar Details?
                  </Label>
                  <span className='text-sm text-muted-foreground'>
                    (Override for Default Visibility)
                    <br />
                    <span className='text-sm text-muted-foreground'>
                      This setting will override the default visibility for your
                      calendar. You can set specific friends or groups to see
                      your full calendar details.
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
                <div className='space-y-2'>
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
                <div className='space-y-2'>
                  <Label>Blocked Users</Label>
                  <Button variant='outline_muted'>Manage Blocked Users</Button>
                  <span className='text-sm text-muted-foreground'>
                    Prevent specific users from seeing your calendar or booking
                    time.
                  </span>
                </div>
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
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='theme'>Theme</Label>
                  <ThemePicker />
                </div>
                <div className='space-y-2'>
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
                <div className='space-y-2'>
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
