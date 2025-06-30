import BlockedSlotForm from '@/components/forms/blocked-slot-form';

export default async function NewBlockedSlotPage({
  params,
}: {
  params: Promise<{ slotId?: string }>;
}) {
  const resolvedParams = await params;
  return <BlockedSlotForm existingBlockedSlotId={resolvedParams.slotId} />;
}
