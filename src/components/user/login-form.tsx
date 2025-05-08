import LabeledInput from '@/components/labeled-input';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  return (
    <div>
      <form className='flex flex-col gap-4'>
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
        <Button type='submit' variant='secondary'>
          Login
        </Button>
      </form>
    </div>
  );
}
