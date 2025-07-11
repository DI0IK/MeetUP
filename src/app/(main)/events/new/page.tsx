import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EventForm from '@/components/forms/event-form';
import { Suspense } from 'react';

export default function NewEvent() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Card className='w-[80%] max-w-screen p-0 gap-0 max-xl:w-[95%] max-h-[90vh] overflow-auto'>
        <CardHeader className='p-0 m-0 gap-0' />

        <CardContent>
          <Suspense>
            <EventForm type='create' />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
