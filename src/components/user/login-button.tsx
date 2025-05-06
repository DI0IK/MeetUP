import Button from '../button';

export default function Login({}: {}) {
  return (
    <form>
      <Button type='submit' mode='neutral' width={250}>
        Login
      </Button>
    </form>
  );
}
