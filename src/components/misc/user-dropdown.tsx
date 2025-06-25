'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetApiUserMe } from '@/generated/api/user/user';
import { ChevronDown, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserCard from '@/components/misc/user-card';

export default function UserDropdown() {
  const { data } = useGetApiUserMe();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline_primary'>
          <Avatar className='flex justify-center items-center'>
            {data?.data.user.image ? (
              <Image
                src={data?.data.user.image}
                alt='Avatar'
                width='20'
                height='20'
              />
            ) : (
              <User />
            )}
          </Avatar>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <UserCard />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/logout'>Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
