import Link from 'next/link';

import { Button } from '@/components/ui/button';

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
