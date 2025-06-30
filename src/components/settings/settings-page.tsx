'use client';

import { useState } from 'react';

import { SettingsDropdown } from '@/components/settings/settings-dropdown';

import AccountTab from './tabs/account';
import NotificationsTab from './tabs/notifications';
import CalendarTab from './tabs/calendar';
import PrivacyTab from './tabs/privacy';
import AppearanceTab from './tabs/appearance';
import PasswordTab from './tabs/password';

export default function SettingsPage() {
  const [currentSection, setCurrentSection] = useState('general');

  const renderSettingsContent = () => {
    switch (currentSection) {
      case 'general':
        return <AccountTab />;

      case 'password':
        return <PasswordTab />;

      case 'notifications':
        return <NotificationsTab />;

      case 'calendarAvailability':
        return <CalendarTab />;

      case 'sharingPrivacy':
        return <PrivacyTab />;

      case 'appearance':
        return <AppearanceTab />;

      default:
        return null;
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm'>
      <div className='rounded-lg border bg-card text-card-foreground shadow-xl max-w-[700px] w-full max-h-[calc(100vh-2rem)] flex flex-col'>
        {/* TODO: Fix overflow */}
        <div className='p-6 border-b'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-semibold'>Settings</h1>
          </div>
          <SettingsDropdown
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
        </div>
        {renderSettingsContent()}
      </div>
    </div>
  );
}
