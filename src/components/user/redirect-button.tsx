import { Button } from '../custom-ui/button';
import Link from 'next/link';

export function RedirectButton({
  redirectUrl,
  buttonText,
}: {
  redirectUrl: string;
  buttonText: string;
}) {
  return (
    <Link href={redirectUrl}>
      <Button>{buttonText}</Button>
    </Link>
  );
}
