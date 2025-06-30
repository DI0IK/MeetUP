'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/custom-ui/sidebar';

import { CalendarMinus, CalendarMinus2, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import Logo from '@/components/misc/logo';

import Link from 'next/link';

import {
  Star,
  CalendarDays,
  //User,
  //Users,
  CalendarClock,
  CalendarPlus,
} from 'lucide-react';

const items = [
  {
    title: 'Calendar',
    url: '/home',
    icon: CalendarDays,
  },
  /*{
    title: 'Friends',
    url: '#',
    icon: User,
  },
  {
    title: 'Groups',
    url: '#',
    icon: Users,
  },*/
  {
    title: 'Events',
    url: '/events',
    icon: CalendarClock,
  },
  {
    title: 'Blockers',
    url: '/blocker',
    icon: CalendarMinus,
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
            height={50}
            className='group-data-[collapsible=icon]:hidden min-w-[203px]'
          ></Logo>
          <Logo
            colorType='colored'
            logoType='submark'
            height={50}
            className='group-data-[collapsible=]:hidden group-data-[mobile=true]/mobile:hidden'
          ></Logo>
        </SidebarHeader>
        <SidebarContent className='grid grid-rows-[auto_1fr_auto] overflow-hidden'>
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
                href='/events/new'
                className='flex items-center gap-2 text-xl font-label'
              >
                <CalendarPlus className='size-8' />
                <span className='group-data-[collapsible=icon]:hidden text-nowrap whitespace-nowrap'>
                  New Event
                </span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem className='pl-[8px]'>
              <Link
                href='/blocker/new'
                className='flex items-center gap-2 text-xl font-label'
              >
                <CalendarMinus2 className='size-8' />
                <span className='group-data-[collapsible=icon]:hidden text-nowrap whitespace-nowrap'>
                  New Blocker
                </span>
              </Link>
            </SidebarMenuItem>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
