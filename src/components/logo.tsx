'use client';

import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

import logo_colored_combo_light from '@/assets/logo/logo_colored_combo_light.svg';
import logo_colored_combo_dark from '@/assets/logo/logo_colored_combo_dark.svg';
import logo_colored_primary_light from '@/assets/logo/logo_colored_primary_light.svg';
import logo_colored_primary_dark from '@/assets/logo/logo_colored_primary_dark.svg';
import logo_colored_secondary_light from '@/assets/logo/logo_colored_secondary_light.svg';
import logo_colored_secondary_dark from '@/assets/logo/logo_colored_secondary_dark.svg';
import logo_mono_combo_light from '@/assets/logo/logo_mono_combo_light.svg';
import logo_mono_combo_dark from '@/assets/logo/logo_mono_combo_dark.svg';
import logo_mono_primary_light from '@/assets/logo/logo_mono_primary_light.svg';
import logo_mono_primary_dark from '@/assets/logo/logo_mono_primary_dark.svg';
import logo_mono_secondary_light from '@/assets/logo/logo_mono_secondary_light.svg';
import logo_mono_secondary_dark from '@/assets/logo/logo_mono_secondary_dark.svg';
import logo_mono_submark_light from '@/assets/logo/logo_mono_submark_light.svg';
import logo_mono_submark_dark from '@/assets/logo/logo_mono_submark_dark.svg';
import logo_colored_submark_light from '@/assets/logo/logo_colored_submark_light.svg';
import logo_colored_submark_dark from '@/assets/logo/logo_colored_submark_dark.svg';
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
  let { resolvedTheme: theme } = useTheme();

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

  console.log(colorType, logoType, theme);

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
  const varName = `logo_${colorTypeInFilename}_${logoType}_${theme}`;

  const logoAssets = {
    logo_colored_combo_light,
    logo_colored_combo_dark,
    logo_colored_primary_light,
    logo_colored_primary_dark,
    logo_colored_secondary_light,
    logo_colored_secondary_dark,
    logo_mono_combo_light,
    logo_mono_combo_dark,
    logo_mono_primary_light,
    logo_mono_primary_dark,
    logo_mono_secondary_light,
    logo_mono_secondary_dark,
    logo_mono_submark_light,
    logo_mono_submark_dark,
    logo_colored_submark_light,
    logo_colored_submark_dark,
  };

  // Match the varName with the Logo-Asset name and store it in "logoVar"
  const logoVar = logoAssets[varName as keyof typeof logoAssets];

  return (
    <Image
      src={logoVar}
      alt={alt || defaultAltText}
      className={className}
      width={width}
      height={height}
      // onError={handleImageError}
      {...imageProps}
    />
  );
}
