import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LabeledInput({
  type,
  label,
  placeholder,
  value,
  name,
  autocomplete,
  error,
  ...rest
}: {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  value?: string;
  name?: string;
  autocomplete?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='grid grid-cols-1 gap-1'>
      <Label htmlFor={name}>{label}</Label>

      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        id={name}
        name={name}
        autoComplete={autocomplete}
        {...rest}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}
