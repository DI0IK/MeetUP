'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ScrollableSettingsWrapper } from '@/components/wrappers/settings-scroll';
import {
  useGetApiUserMe,
  usePatchApiUserMePassword,
} from '@/generated/api/user/user';
import LabeledInput from '@/components/custom-ui/labeled-input';
import { GroupWrapper } from '@/components/wrappers/group-wrapper';

import { BookKey, FileKey, FileKey2, RotateCcwKey } from 'lucide-react';
import useZodForm from '@/lib/hooks/useZodForm';
import { updateUserPasswordServerSchema } from '@/app/api/user/me/validation';
import { useRouter } from 'next/navigation';

export default function PasswordTab() {
  const router = useRouter();
  const { data } = useGetApiUserMe();
  const updatePassword = usePatchApiUserMePassword();

  const { handleSubmit, formState, register, setError } = useZodForm(
    updateUserPasswordServerSchema,
  );

  const onSubmit = handleSubmit(async (data) => {
    await updatePassword.mutateAsync(
      {
        data: data,
      },
      {
        onSuccess: () => {
          router.refresh();
        },
        onError: (error) => {
          if (error instanceof Error) {
            setError('root', {
              message: error.response?.data.message,
            });
          } else {
            setError('root', {
              message: 'An unknown error occurred.',
            });
          }
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
    <form onSubmit={onSubmit}>
      <div className='flex-grow overflow-auto'>
        <Card className='h-full flex flex-col border-0 shadow-none rounded-none'>
          <ScrollableSettingsWrapper>
            <CardHeader>
              <CardTitle>Password Settings</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 my-2'>
              {/*-------------------- Reset Password --------------------*/}
              <GroupWrapper title='Reset Password'>
                <div className='flex flex-col items-center gap-6'>
                  <div className='flex flex-col sm:flex-row gap-6 w-full'>
                    <div className='flex-1'>
                      <LabeledInput
                        type='password'
                        label='Current Password'
                        icon={FileKey}
                        {...register('current_password')}
                        error={formState.errors.current_password?.message}
                      />
                    </div>
                    <div className='flex-1'>
                      <LabeledInput
                        type='password'
                        label='New Password'
                        icon={FileKey2}
                        {...register('new_password')}
                        error={formState.errors.new_password?.message}
                      />
                    </div>
                    <div className='flex-1'>
                      <LabeledInput
                        type='password'
                        label='Repeat Password'
                        icon={RotateCcwKey}
                        {...register('confirm_new_password')}
                        error={formState.errors.confirm_new_password?.message}
                      />
                    </div>
                    <div className='flex items-end'>
                      <Button
                        variant={
                          formState.isValid
                            ? 'outline_secondary'
                            : 'outline_muted'
                        }
                        size='icon'
                        className='w-full md:size-9'
                        disabled={!formState.isValid || formState.isSubmitting}
                      >
                        <BookKey className='h-[1.2rem] w-[1.2rem]' />
                      </Button>
                    </div>
                  </div>
                  {formState.errors.root && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formState.errors.root.message}
                    </p>
                  )}
                </div>
              </GroupWrapper>
              {/*-------------------- Reset Password --------------------*/}
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
    </form>
  );
}
