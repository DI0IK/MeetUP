import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const elementId = Math.random().toString(36).substring(2, 15);

  return (
    <div className='flex flex-col gap-1'>
      <Label htmlFor={elementId}>{label}</Label>

      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        id={elementId}
      />
    </div>
  );
}
