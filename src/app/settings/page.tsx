import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollableSettingsWrapper } from '@/components/wrappers/settings-scroll';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm'>
      <div className='rounded-lg border bg-card text-card-foreground shadow-xl max-w-[700px] w-full h-auto max-h-[calc(100vh-2rem)] flex flex-col'>
        <Tabs
          defaultValue='general'
          className='w-full flex flex-col flex-grow min-h-0'
        >
          <TabsList className='grid w-full grid-cols-3 sm:grid-cols-5'>
            <TabsTrigger value='general'>Account</TabsTrigger>
            <TabsTrigger value='notifications'>Notifications</TabsTrigger>
            <TabsTrigger value='calendarAvailability'>Calendar</TabsTrigger>
            <TabsTrigger value='sharingPrivacy'>Privacy</TabsTrigger>
            <TabsTrigger value='appearance'>Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value='general' className='flex-grow overflow-hidden'>
            <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
              <ScrollableSettingsWrapper>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='displayName'>Display Name</Label>
                    <Input id='displayName' placeholder='Your Name' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='your.email@example.com'
                      readOnly
                      value='user-email@example.com'
                    />
                    <p className='text-sm text-muted-foreground'>
                      Email is managed by your SSO provider.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='profilePicture'>Profile Picture</Label>
                    <Input id='profilePicture' type='file' />
                    <p className='text-sm text-muted-foreground'>
                      Upload a new profile picture.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='timezone'>Timezone</Label>
                    <Input id='displayName' placeholder='Europe/Berlin' />
                  </div>

                  <div className='space-y-2'>
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
                  <div className='pt-4'>
                    <Button variant='secondary'>Delete Account</Button>
                    <p className='text-sm text-muted-foreground pt-1'>
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                </CardContent>
              </ScrollableSettingsWrapper>
              <CardFooter className='mt-auto border-t pt-4 flex justify-between'>
                <Button variant='secondary'>Exit</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value='notifications'
            className='flex-grow overflow-hidden'
          >
            <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
              <ScrollableSettingsWrapper>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex items-center justify-between space-x-2 p-3 rounded-md border'>
                    <Label
                      htmlFor='masterEmailNotifications'
                      className='font-normal'
                    >
                      Enable All Email Notifications
                    </Label>
                    <Switch id='masterEmailNotifications' />
                  </div>
                  <div className='space-y-4 pl-2 border-l-2 ml-2'>
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
                    <div className='flex items-center justify-between space-x-2'>
                      <Label
                        htmlFor='enableMeetingReminders'
                        className='font-normal'
                      >
                        Meeting Reminders
                      </Label>
                      <Switch id='enableMeetingReminders' />
                    </div>
                    <div className='space-y-2 pl-6'>
                      <Label htmlFor='remindBefore'>Remind me before</Label>
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
                </CardContent>
              </ScrollableSettingsWrapper>
              <CardFooter className='mt-auto border-t pt-4 flex justify-between'>
                <Button variant='secondary'>Exit</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value='calendarAvailability'
            className='flex-grow overflow-hidden'
          >
            <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
              <ScrollableSettingsWrapper>
                <CardHeader>
                  <CardTitle>Calendar & Availability</CardTitle>
                  <CardDescription>
                    Manage your calendar display, default availability, and iCal
                    integrations.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <fieldset className='space-y-4 p-4 border rounded-md'>
                    <legend className='text-sm font-medium px-1'>
                      Display
                    </legend>
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
                      <p className='text-sm text-muted-foreground'>
                        Define your typical available hours (e.g.,
                        Monday-Friday, 9 AM - 5 PM).
                      </p>
                      <Button variant='outline_muted' size='sm'>
                        Set Working Hours
                      </Button>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='minNoticeBooking'>
                        Minimum Notice for Bookings
                      </Label>
                      <p className='text-sm text-muted-foreground'>
                        Min time before a booking can be made.
                      </p>
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
                      <p className='text-sm text-muted-foreground'>
                        Max time in advance a booking can be made.
                      </p>
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
                      <Button
                        variant='outline_muted'
                        size='sm'
                        className='ml-2'
                      >
                        Download .ics File
                      </Button>
                    </div>
                  </fieldset>
                </CardContent>
              </ScrollableSettingsWrapper>
              <CardFooter className='mt-auto border-t pt-4 flex justify-between'>
                <Button variant='secondary'>Exit</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value='sharingPrivacy'
            className='flex-grow overflow-hidden'
          >
            <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
              <ScrollableSettingsWrapper>
                <CardHeader>
                  <CardTitle>Sharing & Privacy</CardTitle>
                  <CardDescription>
                    Control who can see your calendar and book time with you.
                  </CardDescription>
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
                    <p className='text-sm text-muted-foreground'>
                      (Override for Default Visibility)
                      <br />
                      <span className='text-sm text-muted-foreground'>
                        This setting will override the default visibility for
                        your calendar. You can set specific friends or groups to
                        see your full calendar details.
                      </span>
                    </p>
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
                    <Button variant='outline_muted'>
                      Manage Blocked Users
                    </Button>
                    <p className='text-sm text-muted-foreground'>
                      Prevent specific users from seeing your calendar or
                      booking time.
                    </p>
                  </div>
                </CardContent>
              </ScrollableSettingsWrapper>
              <CardFooter className='mt-auto border-t pt-4 flex justify-between'>
                <Button variant='secondary'>Exit</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='appearance' className='flex-grow overflow-hidden'>
            <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
              <ScrollableSettingsWrapper>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='theme'>Theme</Label>
                    <Select>
                      <SelectTrigger id='theme'>
                        <SelectValue placeholder='Select theme' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='light'>Light</SelectItem>
                        <SelectItem value='dark'>Dark</SelectItem>
                        <SelectItem value='system'>System Default</SelectItem>
                      </SelectContent>
                    </Select>
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
              <CardFooter className='mt-auto border-t pt-4 flex justify-between'>
                <Button variant='secondary'>Exit</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
