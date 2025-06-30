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
import LabeledInput from '@/components/custom-ui/labeled-input';
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarCheck,
  CalendarPlus,
  ClockAlert,
  ClockFading,
} from 'lucide-react';
import { IconButton } from '@/components/buttons/icon-button';

export default function CalendarTab() {
  const router = useRouter();
  return (
    <>
      <div className='flex-grow overflow-auto'>
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
                    <Select disabled>
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
                    <Select disabled>
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
                    <Select disabled>
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
                    <Select disabled>
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
                    <Switch id='showWeekends' defaultChecked disabled />
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
                      Define your typical available hours (e.g., Monday-Friday,
                      9 AM - 5 PM).
                    </span>
                    <Button variant='outline_muted' size='sm' disabled>
                      Set Working Hours
                    </Button>
                  </div>
                  <div className='space-y-2'>
                    <LabeledInput
                      disabled
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
                      disabled
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
                      disabled
                      type='url'
                      label='Import iCal Feed URL'
                      icon={CalendarCheck}
                      placeholder='https://calendar.example.com/feed.ics'
                      defaultValue={''}
                      name='icalUrl'
                      required
                    ></LabeledInput>
                    <IconButton
                      disabled
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
                      disabled
                      variant='outline_muted'
                      size='sm'
                      icon={CalendarArrowUp}
                    >
                      Get iCal Export URL
                    </IconButton>
                    <IconButton
                      disabled
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
