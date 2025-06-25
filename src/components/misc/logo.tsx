'use client';

import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

import * as logoAssets from '@/assets/logo/logo-export';
import { useTheme } from 'next-themes';

type ColorType = 'colored' | 'monochrome';
type LogoType = 'combo' | 'primary' | 'secondary' | 'submark';
type Theme = 'light' | 'dark';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  colorType: ColorType;
  logoType: LogoType;
  overrideTheme?: Theme;
  alt?: string;
}

const LOGO_BASE_PATH = '/assets/logo/';
const IMAGE_EXTENSION = 'svg';

export default function Logo({
  colorType,
  logoType,
  overrideTheme,
  alt,
  className = '',
  width,
  height,
  // onError,
  ...imageProps
}: LogoProps) {
  const [mounted, setMounted] = useState(false);
  let { resolvedTheme: theme } = useTheme() as {
    resolvedTheme?: Theme;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (overrideTheme) {
    theme = overrideTheme;
  }

  // Prevent rendering until mounted (theme is available)
  if (!mounted && !overrideTheme) {
    return null;
  }

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
  const defaultAltText = `Logo: ${colorType} ${logoType} ${theme}`;
  const varName = `logo_${colorTypeInFilename}_${logoType}_${theme}` as const;

  // Match the varName with the Logo-Asset name and store it in "logoVar"
  const logoVar = logoAssets[varName];

  if (!logoVar) {
    console.error(`Logo: Could not find logo asset for ${varName}`);
    return (
      <div
        role='alert'
        className='p-2 text-red-700 bg-red-100 border border-red-500 rounded-md text-xs'
      >
        Error: Logo asset not found. Check console.
      </div>
    );
  }

  return (
    <Image
      unoptimized
      src={logoVar}
      alt={alt || defaultAltText}
      className={className}
      width={width}
      height={height}
      {...imageProps}
    />
  );
}
