import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        {children || <div>No children passed to RootLayout</div>}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
