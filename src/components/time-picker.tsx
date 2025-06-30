'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function TimePicker({
  dateLabel = 'Date',
  timeLabel = 'Time',
  date,
  setDate,
  time,
  setTime,
}: {
  dateLabel?: string;
  timeLabel?: string;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  time?: string;
  setTime?: (time: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-3'>
        <Label htmlFor='date' className='px-1'>
          {dateLabel}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='calendar' id='date'>
              {date ? date.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              mode='single'
              selected={date}
              captionLayout='dropdown'
              onSelect={(d) => {
                setDate?.(d);
                setOpen(false);
              }}
              modifiers={{
                today: new Date(),
              }}
              modifiersClassNames={{
                today: 'bg-secondary text-secondary-foreground rounded-full',
              }}
              classNames={{
                day: 'text-center hover:bg-gray-500 hover:rounded-md',
              }}
              weekStartsOn={1} // Set Monday as the first day of the week
              startMonth={new Date(new Date().getFullYear() - 10, 0)}
              endMonth={new Date(new Date().getFullYear() + 14, 12)}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col gap-3'>
        <Label htmlFor='time' className='px-1'>
          {timeLabel}
        </Label>
        <Input
          type='time'
          id='time'
          step='60'
          value={time}
          onChange={(e) => setTime?.(e.target.value)}
          className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
        />
      </div>
    </div>
  );
}
