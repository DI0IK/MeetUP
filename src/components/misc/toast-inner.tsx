/*
USAGE:

import { toast } from 'sonner';
import { ToastInner } from '@/components/misc/toast-inner';

import { Button } from '@/components/ui/button';

 <Button
          variant='outline_primary'
          onClick={() =>


            toast.custom(
              (t) => (
                <ToastInner
                  toastId={t}
                  title=''
                  description=''
                  onAction={() => console.log('on Action')} //No Button shown if this is null
                  variant=''default' | 'success' | 'error' | 'info' | 'warning' | 'notification''
                  buttonText=[No Button shown if this is null]
                  iconName=[Any Icon Name from Lucide in UpperCamelCase or default if null]
                />
              ),


              {
                duration: 5000,
              },
            )
          }
        >
          Show Toast
        </Button>


*/

'use client';

import { toast } from 'sonner';
import { X } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

interface ToastInnerProps {
  title: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
  toastId: string | number;
  variant?:
    | 'default'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'notification';
  iconName?: keyof typeof Icons;
  closeOnAction?: boolean;
}

const variantConfig = {
  default: {
    bgColor: 'bg-neutral-150',
    defaultIcon: 'Info',
  },
  success: {
    bgColor: 'bg-green-200',
    defaultIcon: 'CheckCircle',
  },
  error: {
    bgColor: 'bg-red-200',
    defaultIcon: 'XCircle',
  },
  info: {
    bgColor: 'bg-blue-200',
    defaultIcon: 'Info',
  },
  warning: {
    bgColor: 'bg-yellow-200',
    defaultIcon: 'AlertTriangle',
  },
  notification: {
    bgColor: 'bg-neutral-150',
    defaultIcon: 'BellRing',
  },
};

export const ToastInner: React.FC<ToastInnerProps> = ({
  title,
  description,
  buttonText,
  onAction,
  toastId,
  variant = 'default',
  iconName,
  closeOnAction = true,
}) => {
  const bgColor = variantConfig[variant].bgColor;

  // fallback to variant's default icon if iconName is not provided
  const iconKey = (iconName ||
    variantConfig[variant].defaultIcon) as keyof typeof Icons;
  const Icon = Icons[iconKey] as React.ComponentType<Icons.LucideProps>;

  return (
    <div className={`relative sm:w-120 rounded p-4 ${bgColor} select-none`}>
      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(toastId)}
        className='absolute top-2 right-2 cursor-pointer'
        aria-label='Close notification'
      >
        <X className='h-4 w-4 text-neutral-600' />
      </button>

      <div
        className={`grid ${
          variant === 'default'
            ? 'grid-cols-[auto_130px] max-sm:grid-cols-[auto_90px]'
            : 'grid-cols-[40px_auto_130px] max-sm:grid-cols-[40px_auto_90px]'
        } gap-4 items-center`}
      >
        {variant !== 'default' && (
          <div className='flex items-center justify-center'>
            <Icon size={40} />
          </div>
        )}

        {/* Text Content */}
        <div className='grid gap-1'>
          <h6>{title}</h6>
          {description && <Label>{description}</Label>}
        </div>

        {/* Action Button */}
        <div className='flex justify-center'>
          {onAction && buttonText && (
            <Button
              variant={'secondary'}
              className='w-full mr-2'
              onClick={() => {
                onAction();
                if (closeOnAction) {
                  toast.dismiss(toastId);
                }
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
