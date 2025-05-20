'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

type ColorType = 'colored' | 'monochrome';
type LogoType = 'combo' | 'primary' | 'secondary' | 'submark';
type Theme = 'light' | 'dark';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  colorType: ColorType;
  logoType: LogoType;
  theme: Theme;
  alt?: string;
}

const LOGO_BASE_PATH = '/assets/logo/';
const IMAGE_EXTENSION = 'svg';

export default function Logo({
  colorType,
  logoType,
  theme,
  alt,
  className = '',
  width,
  height,
  onError,
  ...imageProps
}: LogoProps) {
  if (!colorType || !logoType || !theme) {
    const errorMessage =
      'Logo: colorType, logoType, and theme props are required.';
    console.error(errorMessage);
    return (
      <div
        role='alert'
        className='p-2 text-red-700 bg-red-100 border border-red-500 rounded-md text-xs'
      >
        Error: Missing required logo props. Check console.
      </div>
    );
  }

  if (width === undefined || height === undefined) {
    console.warn(
      `Logo: 'width' and 'height' props are required by next/image for ${logoType} logo. Path: ${LOGO_BASE_PATH}logo_${colorType}_${logoType}_${theme}.${IMAGE_EXTENSION}`,
    );
  }

  const colorTypeInFilename = colorType === 'monochrome' ? 'mono' : colorType;
  const filename = `logo_${colorTypeInFilename}_${logoType}_${theme}.${IMAGE_EXTENSION}`;
  const logoUrl = `${LOGO_BASE_PATH}${filename}`;
  const defaultAltText = `Logo: ${colorType} ${logoType} ${theme}`;

  const handleImageError: ImageProps['onError'] = (e) => {
    console.error(`Error loading logo via next/image: ${logoUrl}`, e);
    if (onError) {
      onError(e);
    }
  };

  return (
    <Image
      src={logoUrl}
      alt={alt || defaultAltText}
      className={className}
      width={width}
      height={height}
      onError={handleImageError}
      {...imageProps}
    />
  );
}
