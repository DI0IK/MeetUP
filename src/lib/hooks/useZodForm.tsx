import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useZodForm<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Schema extends z.ZodType<any, any, any>,
  Values extends z.infer<Schema>,
>(schema: Schema, defaultValues?: Values) {
  return useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
