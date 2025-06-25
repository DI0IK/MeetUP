import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LabeledInput({
  type,
  label,
  placeholder,
  value,
  name,
  variantSize = 'default',
  autocomplete,
  error,
  ...rest
}: {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  value?: string;
  name?: string;
  variantSize?: 'default' | 'big' | 'textarea';
  autocomplete?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='grid grid-cols-1 gap-1'>
      <Label htmlFor={name}>{label}</Label>
      {variantSize === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          defaultValue={value}
          id={name}
          name={name}
          rows={3}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          id={name}
          name={name}
          className={
            variantSize === 'big'
              ? 'h-12 file:h-10 text-lg gplaceholder:text-lg sm:text-2xl sm:placeholder:text-2xl'
              : ''
          }
          autoComplete={autocomplete}
          {...rest}
        />
      )}
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}
