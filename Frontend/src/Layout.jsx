import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const RootLayout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        {children || <div>No children passed to RootLayout</div>}
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
