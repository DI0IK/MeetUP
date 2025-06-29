import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EventForm from '@/components/forms/event-form';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ eventID: string }>;
}) {
  const eventID = (await params).eventID;
  return (
    <Card className='w-[80%] max-w-screen p-0 gap-0 max-xl:w-[95%] mx-auto'>
      <CardHeader className='p-0 m-0 gap-0' />

      <CardContent>
        <Suspense>
          <EventForm type='edit' eventId={eventID} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
