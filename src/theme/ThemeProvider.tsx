"use client";

import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <div>
      <NextThemeProvider {...props}>{children}</NextThemeProvider>
    </div>
  );
};
