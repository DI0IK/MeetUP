'use client';

import React from 'react';

import { SidebarProvider } from '@/components/custom-ui/sidebar';

export default function SidebarProviderWrapper({
  defaultOpen,
  children,
}: {
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={setOpen}
    >
      {children}
    </SidebarProvider>
  );
}
