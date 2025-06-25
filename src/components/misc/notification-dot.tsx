import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { CircleSmall } from 'lucide-react';

const dotVariants = cva('', {
  variants: {
    variant: {
      neutral: 'fill-neutral-900',
      active: 'fill-red-600 stroke-red-600',
      hidden: 'hidden',
    },
  },
  defaultVariants: {
    variant: 'hidden',
  },
});

function NotificationDot({
  className,
  dotVariant,
  ...props
}: {
  className: string;
  dotVariant: VariantProps<typeof dotVariants>['variant'];
}) {
  return (
    <CircleSmall
      className={cn(dotVariants({ variant: dotVariant }), className)}
      {...props}
    />
  );
}

export type NDot = VariantProps<typeof dotVariants>['variant'];
export { NotificationDot, dotVariants };
