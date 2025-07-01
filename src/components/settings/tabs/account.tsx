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
import {
  useDeleteApiUserMe,
  useGetApiUserMe,
  usePatchApiUserMe,
} from '@/generated/api/user/user';
import LabeledInput from '@/components/custom-ui/labeled-input';
import { GroupWrapper } from '@/components/wrappers/group-wrapper';

import ProfilePictureUpload from '@/components/misc/profile-picture-upload';
import { CalendarClock, MailOpen, UserPen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useZodForm from '@/lib/hooks/useZodForm';
import { updateUserClientSchema } from '@/app/api/user/me/validation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ToastInner } from '@/components/misc/toast-inner';

export default function AccountTab() {
  const router = useRouter();
  const { data, refetch } = useGetApiUserMe();
  const deleteUser = useDeleteApiUserMe();
  const updateAccount = usePatchApiUserMe();

  const { handleSubmit, formState, register } = useZodForm(
    updateUserClientSchema,
  );

  const onSubmit = handleSubmit(async (submitData) => {
    await updateAccount.mutateAsync(
      {
        data: {
          first_name:
            submitData?.first_name !== data?.data.user.first_name
              ? submitData?.first_name
              : undefined,
          last_name:
            submitData?.last_name !== data?.data.user.last_name
              ? submitData?.last_name
              : undefined,
          name:
            submitData?.name !== data?.data.user.name
              ? submitData?.name
              : undefined,
          email:
            submitData?.email !== data?.data.user.email
              ? submitData?.email
              : undefined,
          image:
            submitData?.image !== data?.data.user.image
              ? submitData?.image
              : undefined,
          timezone:
            submitData?.timezone !== data?.data.user.timezone
              ? submitData?.timezone
              : undefined,
        },
      },
      {
        onSuccess: () => {
          refetch();
          toast.custom((t) => (
            <ToastInner
              toastId={t}
              title='Settings saved'
              description='Your account settings have been updated successfully.'
              variant='success'
            />
          ));
        },
        onError: (error) => {
          toast.custom((t) => (
            <ToastInner
              toastId={t}
              title='Error saving settings'
              description={
                error.response?.data.message || 'An unknown error occurred.'
              }
              variant='error'
            />
          ));
        },
      },
    );
  });

  if (!data) {
    return (
      <div className='fixed inset-0 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-xl max-w-[700px] w-full h-auto max-h-[calc(100vh-2rem)] flex flex-col'>
          <div className='p-6 border-b'>
            <h1 className='text-2xl font-semibold'>Loading Settings...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className='h-full flex-grow overflow-auto'>
      <Card className='pb-0 h-full flex flex-col border-0 shadow-none rounded-none'>
        <ScrollableSettingsWrapper>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 my-2'>
            {/*-------------------- General Settings --------------------*/}
            <GroupWrapper title='General Settings'>
              <div className='space-y-4'>
                <div>
                  <LabeledInput
                    type='text'
                    label='First Name'
                    placeholder='First Name'
                    defaultValue={data.data.user.first_name ?? ''}
                    {...register('first_name')}
                    error={formState.errors.first_name?.message}
                  ></LabeledInput>
                </div>
                <div>
                  <LabeledInput
                    type='text'
                    label='Last Name'
                    placeholder='Last Name'
                    defaultValue={data.data.user.last_name ?? ''}
                    {...register('last_name')}
                    error={formState.errors.last_name?.message}
                  ></LabeledInput>
                </div>
                <div className='space-y-2'>
                  <LabeledInput
                    type='text'
                    label='User Name'
                    icon={UserPen}
                    placeholder='User Name'
                    defaultValue={data.data.user.name}
                    {...register('name')}
                    error={formState.errors.name?.message}
                  ></LabeledInput>
                </div>
                <div className='space-y-2 space-b-2'>
                  <LabeledInput
                    type='email'
                    label='Email Address'
                    icon={MailOpen}
                    placeholder='Your E-Mail'
                    defaultValue={data.data.user.email ?? ''}
                    {...register('email')}
                    error={formState.errors.email?.message}
                  ></LabeledInput>

                  <span className='text-sm text-muted-foreground'>
                    Email might be managed by your SSO provider.
                  </span>
                </div>
              </div>
              {formState.errors.root && (
                <p className='text-red-500 text-sm mt-1'>
                  {formState.errors.root.message}
                </p>
              )}
            </GroupWrapper>
            {/*-------------------- General Settings --------------------*/}
            {/*-------------------- Profile Picture --------------------*/}
            <GroupWrapper title='Profile Picture'>
              <div className='space-y-2 grid grid-cols-[1fr_auto]'>
                <ProfilePictureUpload disabled />
              </div>
            </GroupWrapper>
            {/*-------------------- Profile Picture --------------------*/}
            {/*-------------------- Regional Settings --------------------*/}
            <GroupWrapper title='Regional Settings'>
              <div className='space-y-2 grid sm:grid-cols-[1fr_auto] sm:flex-row gap-4'>
                <div className='grid gap-1'>
                  <LabeledInput
                    type='text'
                    label='Timezone'
                    placeholder='Europe/Berlin'
                    icon={CalendarClock}
                    defaultValue={data?.data.user.timezone ?? ''}
                    {...register('timezone')}
                    error={
                      formState.errors.timezone?.message
                        ? 'Invalid Timezone'
                        : undefined
                    }
                  ></LabeledInput>
                </div>
                <div>
                  <div className='grid gap-1'>
                    <Label htmlFor='language'>Language</Label>
                    <Select disabled>
                      <SelectTrigger id='language'>
                        <SelectValue placeholder='Select language' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='en'>English</SelectItem>
                        <SelectItem value='de'>German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </GroupWrapper>
            {/*-------------------- Regional Settings --------------------*/}
            {/*-------------------- DANGER ZONE --------------------*/}
            <GroupWrapper title='DANGER ZONE' className='border-destructive'>
              <div className='flex items-center justify-evenly sm:flex-row flex-col gap-6'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='destructive'>Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <div className='space-y-4'>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <div className='space-y-4'>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                          <Button
                            variant='destructive'
                            onClick={() => {
                              deleteUser.mutate(undefined, {
                                onSuccess: () => {
                                  router.push('/api/logout');
                                },
                              });
                            }}
                          >
                            Confirm Delete
                          </Button>
                        </div>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <span className='text-sm text-muted-foreground pt-1'>
                  Permanently delete your account and all associated data.
                </span>
              </div>
            </GroupWrapper>
            {/*-------------------- DANGER ZONE --------------------*/}
          </CardContent>
        </ScrollableSettingsWrapper>
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
      </Card>
    </form>
  );
}
