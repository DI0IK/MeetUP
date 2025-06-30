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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GroupWrapper } from '@/components/wrappers/group-wrapper';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/components/buttons/icon-button';
import { UserLock } from 'lucide-react';

export default function PrivacyTab() {
  const router = useRouter();
  return (
    <>
      <div className='flex-grow overflow-auto'>
        <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
          <ScrollableSettingsWrapper>
            <CardHeader>
              <CardTitle>Sharing & Privacy</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 my-2'>
              {/*-------------------- Privacy Settigs --------------------*/}
              <GroupWrapper title='Privacy Settings'>
                <div className='flex flex-col space-y-4'>
                  <div className='grid grid-cols-1 gap-1'>
                    <Label htmlFor='defaultVisibility'>
                      Default Calendar Visibility
                    </Label>
                    <span className='text-sm text-muted-foreground'>
                      Default setting for new friends.
                    </span>
                    <Select disabled>
                      <SelectTrigger id='defaultVisibility'>
                        <SelectValue placeholder='Select visibility' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='private'>
                          Private (Only You)
                        </SelectItem>
                        <SelectItem value='freebusy'>Free/Busy</SelectItem>
                        <SelectItem value='fulldetails'>
                          Full Details
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-1 gap-1'>
                    <Label htmlFor='whoCanSeeFull'>
                      Who Can See Your Full Calendar Details?
                    </Label>
                    <span className='text-sm text-muted-foreground'>
                      (Override for Default Visibility)
                      <br />
                      <span className='text-sm text-muted-foreground'>
                        This setting will override the default visibility for
                        your calendar. You can set specific friends or groups to
                        see your full calendar details.
                      </span>
                    </span>
                    <Select disabled>
                      <SelectTrigger id='whoCanSeeFull'>
                        <SelectValue placeholder='Select audience' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='me'>Only Me</SelectItem>
                        <SelectItem value='friends'>My Friends</SelectItem>
                        <SelectItem value='specific'>
                          Specific Friends/Groups (manage separately)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-1 gap-1'>
                    <Label htmlFor='whoCanBook'>
                      Who Can Book Time With You?
                    </Label>
                    <Select disabled>
                      <SelectTrigger id='whoCanBook'>
                        <SelectValue placeholder='Select audience' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='none'>No One</SelectItem>
                        <SelectItem value='friends'>My Friends</SelectItem>
                        <SelectItem value='specific'>
                          Specific Friends/Groups (manage separately)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 gap-1'>
                      <Label>Blocked Users</Label>
                      <span className='text-sm text-muted-foreground'>
                        Prevent specific users from seeing your calendar or
                        booking time.
                      </span>
                      <IconButton
                        disabled
                        variant='outline_muted'
                        size='sm'
                        icon={UserLock}
                      >
                        Manage Blocked Users
                      </IconButton>
                    </div>
                  </div>
                </div>
              </GroupWrapper>
              {/*-------------------- Privacy Settigs --------------------*/}
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
