'use client';

import useZodForm from '@/lib/hooks/useZodForm';
import {
  updateBlockedSlotSchema,
  createBlockedSlotClientSchema,
} from '@/app/api/blocked_slots/validation';
import {
  useGetApiBlockedSlotsSlotID,
  usePatchApiBlockedSlotsSlotID,
  useDeleteApiBlockedSlotsSlotID,
  usePostApiBlockedSlots,
} from '@/generated/api/blocked-slots/blocked-slots';
import { useRouter } from 'next/navigation';
import React from 'react';
import LabeledInput from '../custom-ui/labeled-input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import Logo from '../misc/logo';
import { eventStartTimeSchema } from '@/app/api/event/validation';
import zod from 'zod/v4';

const dateForDateTimeInputValue = (date: Date) =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19);

export default function BlockedSlotForm({
  existingBlockedSlotId,
}: {
  existingBlockedSlotId?: string;
}) {
  const router = useRouter();

  const { data: existingBlockedSlot, isLoading: isLoadingExisting } =
    useGetApiBlockedSlotsSlotID(existingBlockedSlotId || '');

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    formState: formStateCreate,
    reset: resetCreate,
  } = useZodForm(createBlockedSlotClientSchema);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    formState: formStateUpdate,
    reset: resetUpdate,
    setValue: setValueUpdate,
  } = useZodForm(
    updateBlockedSlotSchema.extend({
      start_time: eventStartTimeSchema.or(zod.iso.datetime({ local: true })),
      end_time: eventStartTimeSchema.or(zod.iso.datetime({ local: true })),
    }),
  );

  const { mutateAsync: updateBlockedSlot } = usePatchApiBlockedSlotsSlotID({
    mutation: {
      onSuccess: () => {
        resetUpdate();
      },
    },
  });

  const { mutateAsync: deleteBlockedSlot } = useDeleteApiBlockedSlotsSlotID({
    mutation: {
      onSuccess: () => {
        router.push('/blocker');
      },
    },
  });

  const { mutateAsync: createBlockedSlot } = usePostApiBlockedSlots({
    mutation: {
      onSuccess: () => {
        resetCreate();
        router.push('/blocker');
      },
    },
  });

  React.useEffect(() => {
    if (existingBlockedSlot?.data) {
      setValueUpdate(
        'start_time',
        dateForDateTimeInputValue(
          new Date(existingBlockedSlot?.data.blocked_slot.start_time),
        ),
      );
      setValueUpdate(
        'end_time',
        dateForDateTimeInputValue(
          new Date(existingBlockedSlot?.data.blocked_slot.end_time),
        ),
      );
      setValueUpdate(
        'reason',
        existingBlockedSlot?.data.blocked_slot.reason || '',
      );
    }
  }, [
    existingBlockedSlot?.data,
    resetUpdate,
    setValueUpdate,
    isLoadingExisting,
  ]);

  const onUpdateSubmit = handleUpdateSubmit(async (data) => {
    await updateBlockedSlot(
      {
        data: {
          ...data,
          start_time: new Date(data.start_time).toISOString(),
          end_time: new Date(data.end_time).toISOString(),
        },
        slotID: existingBlockedSlotId || '',
      },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  });

  const onDeleteSubmit = async () => {
    if (existingBlockedSlotId) {
      await deleteBlockedSlot({ slotID: existingBlockedSlotId });
    }
  };

  const onCreateSubmit = handleCreateSubmit(async (data) => {
    await createBlockedSlot({
      data: {
        ...data,
        start_time: new Date(data.start_time).toISOString(),
        end_time: new Date(data.end_time).toISOString(),
      },
    });
  });

  if (existingBlockedSlotId)
    return (
      <div className='flex items-center justify-center h-full'>
        <Card className='w-[max(80%, 500px)] max-w-screen p-0 gap-0 max-xl:w-[95%] mx-auto'>
          <CardHeader className='p-0 m-0 gap-0 px-6'>
            <div className='h-full mt-0 ml-2 mb-16 flex items-center justify-between max-sm:grid max-sm:grid-row-start:auto max-sm:mb-6 max-sm:mt-10 max-sm:ml-0'>
              <div className='w-[100px] max-sm:w-full max-sm:flex max-sm:justify-center'>
                <Logo colorType='monochrome' logoType='submark' width={50} />
              </div>
              <div className='items-center ml-auto mr-auto max-sm:mb-6 max-sm:w-full max-sm:flex max-sm:justify-center'>
                <h1 className='text-center'>{'Update Blocker'}</h1>
              </div>
              <div className='w-0 sm:w-[100px]'></div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onUpdateSubmit}>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <LabeledInput
                  label='Start Time'
                  type='datetime-local'
                  id='start_time'
                  {...registerUpdate('start_time')}
                  error={formStateUpdate.errors.start_time?.message}
                  required
                />
                <LabeledInput
                  label='End Time'
                  type='datetime-local'
                  id='end_time'
                  {...registerUpdate('end_time')}
                  error={formStateUpdate.errors.end_time?.message}
                  required
                />
                <LabeledInput
                  label='Reason'
                  type='text'
                  id='reason'
                  {...registerUpdate('reason')}
                  error={formStateUpdate.errors.reason?.message}
                  placeholder='Optional reason for blocking this slot'
                />
              </div>
              <div className='flex justify-end gap-2 p-4'>
                <Button
                  type='submit'
                  variant='primary'
                  disabled={formStateUpdate.isSubmitting}
                >
                  {'Update Blocker'}
                </Button>
                {existingBlockedSlotId && (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={onDeleteSubmit}
                  >
                    Delete Blocker
                  </Button>
                )}
              </div>
              {formStateUpdate.errors.root && (
                <p className='text-red-500 text-sm mt-1'>
                  {formStateUpdate.errors.root.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  else
    return (
      <div className='flex items-center justify-center h-full'>
        <Card className='w-[max(80%, 500px)] max-w-screen p-0 gap-0 max-xl:w-[95%] mx-auto'>
          <CardHeader className='p-0 m-0 gap-0 px-6'>
            <div className='h-full mt-0 ml-2 mb-16 flex items-center justify-between max-sm:grid max-sm:grid-row-start:auto max-sm:mb-6 max-sm:mt-10 max-sm:ml-0'>
              <div className='w-[100px] max-sm:w-full max-sm:flex max-sm:justify-center'>
                <Logo colorType='monochrome' logoType='submark' width={50} />
              </div>
              <div className='items-center ml-auto mr-auto max-sm:mb-6 max-sm:w-full max-sm:flex max-sm:justify-center'>
                <h1 className='text-center'>{'Create Blocker'}</h1>
              </div>
              <div className='w-0 sm:w-[100px]'></div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onCreateSubmit}>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <LabeledInput
                  label='Start Time'
                  type='datetime-local'
                  id='start_time'
                  {...registerCreate('start_time')}
                  error={formStateCreate.errors.start_time?.message}
                  required
                />
                <LabeledInput
                  label='End Time'
                  type='datetime-local'
                  id='end_time'
                  {...registerCreate('end_time')}
                  error={formStateCreate.errors.end_time?.message}
                  required
                />
                <LabeledInput
                  label='Reason'
                  type='text'
                  id='reason'
                  {...registerCreate('reason')}
                  error={formStateCreate.errors.reason?.message}
                  placeholder='Optional reason for blocking this slot'
                />
              </div>
              <div className='flex justify-end gap-2 p-4'>
                <Button
                  type='submit'
                  variant='primary'
                  disabled={formStateCreate.isSubmitting}
                >
                  {'Create Blocker'}
                </Button>
                {existingBlockedSlotId && (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={onDeleteSubmit}
                  >
                    Delete Blocker
                  </Button>
                )}
              </div>
              {formStateCreate.errors.root && (
                <p className='text-red-500 text-sm mt-1'>
                  {formStateCreate.errors.root.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
}
