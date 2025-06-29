import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LabeledInput({
  type,
  label,
  subtext,
  placeholder,
  value,
  name,
  variantSize = 'default',
  autocomplete,
  error,
  ...rest
}: {
  label: string;
  subtext?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  variantSize?: 'default' | 'big' | 'textarea';
  autocomplete?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div className='grid grid-cols-1 gap-1'>
      <Label htmlFor={name}>{label}</Label>
      {subtext && (
        <Label className='text-sm text-muted-foreground' htmlFor={name}>
          {subtext}
        </Label>
      )}
      {variantSize === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          defaultValue={value}
          id={name}
          name={name}
          rows={3}
        />
      ) : (
        <span className='relative'>
          <Input
            className={cn(
              type === 'password' ? 'pr-[50px]' : '',
              variantSize === 'big'
                ? 'h-12 file:h-10 text-lg gplaceholder:text-lg sm:text-2xl sm:placeholder:text-2xl'
                : '',
            )}
            type={passwordVisible ? 'text' : type}
            placeholder={placeholder}
            defaultValue={value}
            id={name}
            name={name}
            autoComplete={autocomplete}
            {...rest}
          />

          {type === 'password' && (
            <Button
              className='absolute right-0 top-0 w-[36px] h-[36px]'
              type='button'
              variant={'outline_muted'}
              onClick={() => setPasswordVisible((visible) => !visible)}
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </Button>
          )}
        </span>
      )}

      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}
