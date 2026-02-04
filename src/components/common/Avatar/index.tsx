'use client';

import React from 'react';
import Image from 'next/image';
import { getInitials } from '@/utils/formatters';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-xl',
};

const imageSizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const sizeClass = sizeStyles[size];
  const imageSize = imageSizes[size];

  if (src) {
    return (
      <div
        className={`relative rounded-full overflow-hidden ${sizeClass} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={imageSize}
          height={imageSize}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-full bg-gray-200 text-gray-600 font-medium
        ${sizeClass}
        ${className}
      `}
    >
      {getInitials(alt)}
    </div>
  );
}
