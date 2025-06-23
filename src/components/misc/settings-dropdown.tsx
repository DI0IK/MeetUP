'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  Check,
  ChevronDown,
  User,
  Bell,
  Calendar,
  Shield,
  Palette,
} from 'lucide-react';

interface SettingsSection {
  label: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SettingsDropdownProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

const settingsSections: SettingsSection[] = [
  {
    label: 'Account',
    value: 'general',
    description: 'Manage your account details and preferences',
    icon: User,
  },
  {
    label: 'Notifications',
    value: 'notifications',
    description: 'Choose how you want to be notified',
    icon: Bell,
  },
  {
    label: 'Calendar',
    value: 'calendarAvailability',
    description: 'Manage calendar display and availability',
    icon: Calendar,
  },
  {
    label: 'Privacy',
    value: 'sharingPrivacy',
    description: 'Control who can see your calendar',
    icon: Shield,
  },
  {
    label: 'Appearance',
    value: 'appearance',
    description: 'Customize the look and feel',
    icon: Palette,
  },
];

export function SettingsDropdown({
  currentSection,
  onSectionChange,
  className,
}: SettingsDropdownProps) {
  const [open, setOpen] = useState(false);

  const currentSectionData = settingsSections.find(
    (section) => section.value === currentSection,
  );
  const CurrentIcon = currentSectionData?.icon || User;

  const handleSelect = (value: string) => {
    onSectionChange(value);
    setOpen(false);
  };

  return (
    <div className={cn('w-full max-w-md', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline_muted'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between bg-white text-black h-auto py-3'
          >
            <div className='flex items-center gap-3'>
              <CurrentIcon className='h-4 w-4 text-muted-foreground' />
              <div className='flex flex-col items-start text-left'>
                <span className='font-medium'>{currentSectionData?.label}</span>
                <span className='text-xs text-muted-foreground'>
                  {currentSectionData?.description}
                </span>
              </div>
            </div>
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0' align='start'>
          <Command>
            <CommandInput placeholder='Search settings...' />
            <CommandList>
              <CommandEmpty>No settings found.</CommandEmpty>
              <CommandGroup>
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <CommandItem
                      key={section.value}
                      value={section.value}
                      onSelect={() => handleSelect(section.value)}
                      className='flex items-center justify-between p-3'
                    >
                      <div className='flex items-center gap-3'>
                        <Icon className='h-4 w-4 text-muted-foreground' />
                        <div className='flex flex-col'>
                          <span className='font-medium'>{section.label}</span>
                          <span className='text-xs text-muted-foreground'>
                            {section.description}
                          </span>
                        </div>
                      </div>
                      <Check
                        className={cn(
                          'ml-2 h-4 w-4',
                          currentSection === section.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
