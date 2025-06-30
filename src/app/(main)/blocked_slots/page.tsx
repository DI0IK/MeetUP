'use client';

import { RedirectButton } from '@/components/buttons/redirect-button';
import BlockedSlotListEntry from '@/components/custom-ui/blocked-slot-list-entry';
import { Label } from '@/components/ui/label';
import { useGetApiBlockedSlots } from '@/generated/api/blocked-slots/blocked-slots';

export default function BlockedSlots() {
  const { data: blockedSlotsData, isLoading, error } = useGetApiBlockedSlots();

  if (isLoading) return <div className='text-center mt-10'>Loading...</div>;
  if (error)
    return (
      <div className='text-center mt-10 text-red-500'>
        Error loading blocked slots
      </div>
    );

  const blockedSlots = blockedSlotsData?.data?.blocked_slots || [];

  return (
    <div className='relative h-full flex flex-col items-center'>
      {/* Heading */}
      <h1 className='text-3xl font-bold mt-8 mb-4 text-center z-10'>
        My Blocked Slots
      </h1>

      {/* Scrollable blocked slot list */}
      <div className='w-full flex justify-center overflow-hidden'>
        <div className='grid gap-8 w-[max(90%, 500px)] p-6 overflow-y-auto'>
          {blockedSlots.length > 0 ? (
            blockedSlots.map((slot) => (
              <BlockedSlotListEntry
                key={slot.id}
                {...slot}
                updated_at={new Date(slot.updated_at)}
                created_at={new Date(slot.created_at)}
              />
            ))
          ) : (
            <div className='flex flex-1 flex-col items-center justify-center min-h-[300px]'>
              <Label size='large' className='justify-center text-center'>
                You don&#39;t have any blocked slots right now
              </Label>
              <RedirectButton
                redirectUrl='/blocked_slots/new'
                buttonText='create Blocked Slot'
                className='mt-4'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
