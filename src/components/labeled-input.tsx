import { Input } from '@/components/ui/input';

export default function LabeledInput({
  type,
  label,
  placeholder,
  value,
}: {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  value?: string;
}) {
  const randomId = Math.random().toString(36).substring(2, 15);

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={randomId}>{label}</label>

      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        id={randomId}
      />
    </div>
  );
}
