import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemePicker } from '@/components/misc/theme-picker';

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full grid grid-rows-[50px_1fr] h-screen'>
      <header className='border-b-1 grid-cols-[1fr_3fr_1fr] grid items-center px-2'>
        <span className='flex justify-start'>
          <SidebarTrigger variant='outline_primary' size='icon' />
        </span>
        <span className='flex justify-center'>Search</span>
        <span className='flex justify-end'>
          <ThemePicker />
        </span>
      </header>
      <main>{children}</main>
    </div>
  );
}
