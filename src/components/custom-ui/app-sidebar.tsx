'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import Logo from '@/components/misc/logo';

import Link from 'next/link';

import { ThemePicker } from '@/components/misc/theme-picker';

import {
  Star,
  CalendarDays,
  User,
  Users,
  CalendarClock,
  CalendarPlus,
} from 'lucide-react';

const items = [
  {
    title: 'Calendar',
    url: '#',
    icon: CalendarDays,
  },
  {
    title: 'Friends',
    url: '#',
    icon: User,
  },
  {
    title: 'Groups',
    url: '#',
    icon: Users,
  },
  {
    title: 'Events',
    url: '#',
    icon: CalendarClock,
  },
];

export function AppSidebar() {
  return (
    <>
      <Sidebar collapsible='icon' variant='sidebar'>
        <SidebarHeader className='overflow-hidden'>
          <Logo
            colorType='colored'
            logoType='combo'
            height={49.5}
            className='group-data-[collapsible=icon]:hidden min-w-[203px]'
          ></Logo>
          <Logo
            colorType='colored'
            logoType='submark'
            height={49.5}
            className='group-data-[collapsible=]:hidden group-data-[mobile=true]/mobile:hidden mb-[2.45]'
          ></Logo>
        </SidebarHeader>
        <SidebarContent className='grid grid-rows-[auto_1fr_auto]'>
          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  <span className='flex items-center gap-2 text-xl font-label text-neutral-100'>
                    <Star className='size-8' />{' '}
                    <span className='group-data-[collapsible=icon]:hidden'>
                      Favorites
                    </span>
                  </span>
                  <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden text-nowrap whitespace-nowrap' />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent />
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className='pt-2'>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className='size-8' />
                      <span className='text-xl font-label group-data-[collapsible=icon]:hidden text-nowrap whitespace-nowrap'>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarFooter>
            <SidebarMenuItem className='pl-[8px]'>
              <Link
                href='/event/new'
                className='flex items-center gap-2 text-xl font-label'
              >
                <CalendarPlus className='size-8' />
                <span className='group-data-[collapsible=icon]:hidden text-nowrap whitespace-nowrap'>
                  New Event
                </span>
              </Link>
            </SidebarMenuItem>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
