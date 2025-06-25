import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RedirectButton({
  redirectUrl,
  buttonText,
  className,
}: {
  redirectUrl: string;
  buttonText: string;
  className?: string;
}) {
  return (
    <Link href={redirectUrl}>
      <Button className={className}>{buttonText}</Button>
    </Link>
  );
}
