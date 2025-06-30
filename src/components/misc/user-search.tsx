'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';
import zod from 'zod/v4';

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

import { PublicUserSchema } from '@/app/api/user/validation';

import { useGetApiSearchUser } from '@/generated/api/search/search';

type User = zod.output<typeof PublicUserSchema>;

export function UserSearchInput({
  addUserAction,
  removeUserAction,
  selectedUsers,
}: {
  addUserAction: (user: User) => void;
  removeUserAction: (user: User) => void;
  selectedUsers: User[];
}) {
  const [userSearch, setUserSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { data: searchUserData } = useGetApiSearchUser({ query: userSearch });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline_muted'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {'Select user...'}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search user...'
            value={userSearch}
            onValueChange={setUserSearch}
          />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {searchUserData?.data.users?.map((user) => {
                const isSelected = selectedUsers.some((u) => u.id === user.id);

                return (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={() => {
                      if (isSelected) {
                        removeUserAction(user);
                      } else {
                        addUserAction(user);
                      }
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {user.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
