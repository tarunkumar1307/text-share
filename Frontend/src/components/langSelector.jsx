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
  return (
    <DropdownMenu className="flex border-l-2 w-fit">
      <DropdownMenuTrigger className="border-none">
        {language}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 border-2 bg-card">
        <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-1" />
        <DropdownMenuItem onClick={() => setLanguage("python")}>
          Python
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("html")}>
          HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("css")}>
          CSS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("bash")}>
          Bash
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("json")}>
          JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("rust")}>
          Rust
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("cpp")}>
          Cpp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("java")}>
          Java
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("sql")}>
          Sql
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("go")}>
          Go
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("php")}>
          PHP
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("shell")}>
          Shell
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("http")}>
          Http
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("dockerfile")}>
          Dockerfile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("javascript")}>
          Javascript
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("typescript")}>
          Typescript
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;
