'use client';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import { TailwindIndicator } from './tailwind-indicator';
import { Toaster } from './ui/sonner';
import ProviderQuery from 'src/services/reactQuery/provider';
import VLibras from './VLibras';

type ExtendedThemeProviderProps = ThemeProviderProps;
export default function Providers({ children, ...props }: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ProviderQuery>
        {children}
        <Toaster richColors />
        <TailwindIndicator />
        <VLibras />
      </ProviderQuery>
    </NextThemesProvider>
  );
}
