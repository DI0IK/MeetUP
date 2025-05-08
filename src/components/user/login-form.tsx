import LabeledInput from '@/components/labeled-input';
import Button from '../button';

export default function LoginForm() {
  return (
    <div>
      <form>
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
        <Button type='submit' mode='neutral' width={250}>
          Login
        </Button>
      </form>
    </div>
  );
}
