import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

export default function useZodForm<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Schema extends z.ZodType<any, any, any>,
  Values extends z.infer<Schema>,
>(schema: Schema, defaultValues?: Values) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useForm<z.input<typeof schema>, any, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
