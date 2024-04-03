import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeToggle } from "./theme-toggle";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="fixed right-6 top-4 z-50 shadow-white/10">
        <ThemeToggle />
      </div>
      {children}
    </NextThemesProvider>
  );
}
