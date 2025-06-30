import Image from 'next/image';
import { Avatar } from '../ui/avatar';
import { useGetApiUserMe } from '@/generated/api/user/user';
import { User } from 'lucide-react';

import { Input } from '../ui/input';

export default function ProfilePictureUpload({
  className,
  ...props
}: {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { data } = useGetApiUserMe();
  return (
    <>
      <div className='grid grid-cols-1 gap-1'>
        <span className='relative flex space-6'>
          <Input className={className} id='pic-upload' type='file' {...props} />
          <Avatar className='flex justify-center items-center ml-6 shadow-md border h-[36px] w-[36px]'>
            {data?.data.user.image ? (
              <Image
                src={data?.data.user.image}
                alt='Avatar'
                width='20'
                height='20'
              />
            ) : (
              <User />
            )}
          </Avatar>
        </span>
      </div>
    </>
  );
}
