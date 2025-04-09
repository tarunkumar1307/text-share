import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LangSelector = ({ language, setLanguage }) => {
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  const languages = [
    "python",
    "html",
    "css",
    "bash",
    "json",
    "rust",
    "cpp",
    "java",
    "sql",
    "go",
    "php",
    "shell",
    "http",
    "dockerfile",
    "javascript",
    "typescript",
  ];

  return (
    <DropdownMenu className="flex border-l-2 w-fit">
      <DropdownMenuTrigger className="border-none">
        {language}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 border-2 bg-card">
        <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-1" />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;
