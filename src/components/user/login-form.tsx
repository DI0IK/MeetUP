import LabeledInput from '@/components/labeled-input';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  return (
    <form className='flex flex-col gap-5 w-full'>
      <LabeledInput
        type='email'
        label='E-Mail'
        placeholder='Enter your E-Mail'
      />
      <LabeledInput
        type='password'
        label='Password'
        placeholder='Enter your Password'
      />
      <Button
        className='hover:bg-blue-600 hover:text-white'
        type='submit'
        variant='secondary'
      >
        Login
      </Button>
    </form>
  );
}
