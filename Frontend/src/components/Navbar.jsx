import React from "react";
import { Code2, Copy, Check } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useState } from "react";

const Navbar = () => {
  const { shareID } = useStore();
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const baseUrl = import.meta.env.VITE_APP_URL;
    const url = `${baseUrl}/${shareID}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tight">CodeShare</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {shareID && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                ID: {shareID}
              </span>

              <Button
                onClick={copyLink}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" color="green" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
