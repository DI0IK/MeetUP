import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LabeledInput({
  type,
  label,
  placeholder,
  value,
  name,
}: {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  value?: string;
  name?: string;
}) {
  return (
    <div className='flex flex-col gap-1'>
      <Label htmlFor={name}>{label}</Label>

      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        id={name}
        name={name}
      />
    </div>
  );
}
