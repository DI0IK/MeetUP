'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { ScrollableSettingsWrapper } from '@/components/wrappers/settings-scroll';
import { GroupWrapper } from '@/components/wrappers/group-wrapper';
import { useRouter } from 'next/navigation';
import { ThemePicker } from '@/components/misc/theme-picker';

export default function AppearanceTab() {
  const router = useRouter();
  return (
    <>
      <div className='flex-grow overflow-auto'>
        <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
          <ScrollableSettingsWrapper>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 my-2'>
              {/*-------------------- Change Theme --------------------*/}
              <GroupWrapper title='Change Theme'>
                <div className='space-y-2'>
                  <Label htmlFor='theme'>Theme</Label>
                  <ThemePicker />
                </div>
              </GroupWrapper>
              {/*-------------------- Change Theme --------------------*/}
            </CardContent>
          </ScrollableSettingsWrapper>
        </Card>
      </div>
      <div>
        <CardFooter className='border-t h-[60px] flex content-center justify-between'>
          <Button
            onClick={() => router.back()}
            variant='secondary'
            type='button'
          >
            Exit
          </Button>
          <Button variant='primary'>Save Changes</Button>
        </CardFooter>
      </div>
    </>
  );
}
