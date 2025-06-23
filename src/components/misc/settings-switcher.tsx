'use client';

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
import { Check, ChevronDown } from 'lucide-react';

interface SettingsOption {
  label: string;
  value: string;
  description?: string;
}

interface SettingsSwitcherProps {
  title: string;
  options: SettingsOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function SettingsSwitcher({
  title,
  options,
  defaultValue,
  onValueChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search options...',
  className,
}: SettingsSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.value || '',
  );

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setOpen(false);
    onValueChange?.(value);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        {title}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline_muted'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between bg-white text-black'
          >
            <div className='flex flex-col items-start'>
              <span>{selectedOption?.label || placeholder}</span>
              {selectedOption?.description && (
                <span className='text-xs text-muted-foreground'>
                  {selectedOption.description}
                </span>
              )}
            </div>
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0' align='start'>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className='flex items-center justify-between'
                  >
                    <div className='flex flex-col'>
                      <span>{option.label}</span>
                      {option.description && (
                        <span className='text-xs text-muted-foreground'>
                          {option.description}
                        </span>
                      )}
                    </div>
                    <Check
                      className={cn(
                        'ml-2 h-4 w-4',
                        selectedValue === option.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
