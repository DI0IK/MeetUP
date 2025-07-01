import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LabeledInput({
  type,
  label,
  subtext,
  placeholder,
  value,
  defaultValue,
  name,
  icon,
  variantSize = 'default',
  autocomplete,
  error,
  'data-cy': dataCy,
  ...rest
}: {
  label: string;
  subtext?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  variantSize?: 'default' | 'big' | 'textarea';
  autocomplete?: string;
  error?: string;
  'data-cy'?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    value || defaultValue || '',
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

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
          data-cy={dataCy}
        />
      ) : (
        <span className='relative'>
          <Input
            className={cn(
              type === 'password' ? 'pr-[50px]' : '',
              variantSize === 'big'
                ? 'h-12 file:h-10 text-lg placeholder:text-lg sm:text-2xl sm:placeholder:text-2xl'
                : '',
              icon && inputValue === '' ? 'pl-10' : '',
              'transition-all duration-300 ease-in-out',
            )}
            type={passwordVisible ? 'text' : type}
            placeholder={placeholder}
            defaultValue={inputValue}
            id={name}
            name={name}
            autoComplete={autocomplete}
            data-cy={dataCy}
            {...rest}
            onChange={handleInputChange}
          />
          {icon && (
            <span
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 text-muted-input transition-all duration-300 ease-in-out',
                inputValue === ''
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-75 pointer-events-none',
              )}
            >
              {React.createElement(icon)}
            </span>
          )}
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
