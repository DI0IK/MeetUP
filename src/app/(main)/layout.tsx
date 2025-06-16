import React from 'react';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/custom-ui/app-sidebar';
import SidebarProviderWrapper from '@/components/wrappers/sidebar-provider';
import Header from '@/components/misc/header';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <>
      <SidebarProviderWrapper defaultOpen={defaultOpen}>
        <AppSidebar></AppSidebar>
        <Header>{children}</Header>
      </SidebarProviderWrapper>
    </>
  );
}
