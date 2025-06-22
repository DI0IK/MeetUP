import { useGetApiUserMe } from '@/generated/api/user/user';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function UserCard() {
  const { data } = useGetApiUserMe();
  return (
    <div className='w-full'>
      <Avatar className='flex justify-center items-center'>
        {data?.data.user.image ? (
          <Image
            className='border-2 rounded-md'
            src={data?.data.user.image}
            alt='Avatar'
            width='50'
            height='50'
          />
        ) : (
          <User />
        )}
      </Avatar>
      <div className='flex justify-center'>{data?.data.user.name}</div>
      <div className='flex justify-center text-text-muted'>
        {data?.data.user.email}
      </div>
    </div>
  );
}
