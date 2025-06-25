import { Card } from '@/components/ui/card';
import Logo from '@/components/misc/logo';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

type EventListEntryProps = {
  title: string;
  id: string;
  start_time: string;
  end_time: string;
  location: string | null | undefined;
};

export default function EventListEntry({
  title,
  id,
  start_time,
  end_time,
  location,
}: EventListEntryProps) {
  const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString();
  };
  const formatTime = (isoString?: string) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <Link href={`/events/${id}`} className='block'>
      <Card className='w-full'>
        <div className='grid grid-cols-1 gap-2 mx-auto md:mx-4 md:grid-cols-[80px_1fr_250px]'>
          <div className='w-full items-center justify-center grid'>
            <Logo colorType='monochrome' logoType='submark' width={50} />
          </div>
          <div className='w-full items-center justify-center grid my-3 md:my-0'>
            <h2 className='text-center'>{title}</h2>
          </div>
          <div className='grid gap-4'>
            <div className='grid grid-cols-[80px_auto] gap-2'>
              <Label className='text-[var(--color-neutral-300)] justify-end'>
                start
              </Label>
              <Label>
                {formatDate(start_time)} {formatTime(start_time)}
              </Label>
            </div>
            <div className='grid grid-cols-[80px_auto] gap-2'>
              <Label className='text-[var(--color-neutral-300)] justify-end'>
                end
              </Label>
              <Label>
                {formatDate(end_time)} {formatTime(end_time)}
              </Label>
            </div>
            {location && (
              <div className='grid grid-cols-[80px_auto] gap-2'>
                <Label className='text-[var(--color-neutral-300)] justify-end'>
                  location
                </Label>
                <Label>{location}</Label>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
