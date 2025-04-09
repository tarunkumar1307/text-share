import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { useStore } from "@/store/store";
import { generateContext, fetchCustomData } from "@/lib/functions";
import { useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco, dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import LangSelector from "@/components/langSelector";
import { toast } from "sonner";
import { useTheme } from "@/components/theme-provider";
import { TextScramble } from "@/components/ui/text-scramble";

const Dashboard = () => {
  const { shareID, updateShareID } = useStore();
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [customShareID, setCustomShareID] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [shared, setShared] = useState(false);
  const { theme } = useTheme();

  const highlightRef = useRef();
  const inputRef = useRef();
  const syncScroll = () => {
    highlightRef.current.scrollTop = inputRef.current.scrollTop;
    highlightRef.current.scrollLeft = inputRef.current.scrollLeft;
  };

  return (
    <div className="flex">
      {/* Left side - Controls */}
      <div className="flex flex-col w-1/2 h-auto border-r-2 border-border bg-card">
        <div className="flex flex-col border-b-2 border-border">
          <div className="border-b-2 border-border uppercase font-bold tracking-wider">
            <div className="border-r-2 p-8 border-border h-full w-fit">
              CONTEXT ID
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={customShareID}
              onChange={(e) => setCustomShareID(e.target.value)}
              placeholder={shareID}
              className="flex-1 border-none p-8 text-2xl  bg-card text-card-foreground rounded-none focus-visible:ring-0"
            ></input>
            <Button
              onClick={() => fetchCustomData(customShareID, setContent)}
              className="h-full px-8 py-6 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 font-bold"
            >
              FETCH
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="text-xs uppercase tracking-wider font-bold border-b-2 border-border">
            <div className="border-r-2 p-8 border-border h-full w-fit">
              {content?.length} characters | {content?.split("\n").length} lines
            </div>
          </div>
          {shared && shareID && shareID != "" && (
            <div className="flex items-center justify-center h-full">
              <QRCode
                size={256}
                className="flex justify-center items-center"
                value={url}
                viewBox={`0 0 256 256`}
                fgColor="var(--foreground)"
                bgColor="var(--background)"
              />
            </div>
          )}
          <div className="grid grid-cols-2 w-full mt-auto">
            <Button
              className="bg-primary text-primary-foreground p-8 hover:bg-primary/90 font-bold border-t-2 border-r-2 border-border"
              onClick={() =>
                generateContext(shareID, content, setUrl, updateShareID)
              }
            >
              {shareID && shareID != "" ? "UPDATE CONTEXT" : "CREATE CONTEXT"}
            </Button>

            <Button
              variant="outline"
              className="bg-card p-8  font-bold border-t-2 border-border"
              onClick={() => {
                if (!shareID || shareID == "") {
                  toast("Create context first", {
                    type: "error",
                  });
                  return;
                }
                setShared(true);
              }}
            >
              SHARE
            </Button>
          </div>
        </div>
      </div>

      <div className="w-[80%] h-[calc(100vh-5rem)]">
        <div className="flex justify-end border-b-2 p-4">
          <TextScramble
            className="font-mono text-sm text-black"
            duration={1.2}
            characterSet=". "
          >
            {content}
          </TextScramble>
          <LangSelector language={language} setLanguage={setLanguage} />
        </div>
        <div className="relative w-full h-[calc(100vh-10rem)] rounded-none ">
          <div
            ref={highlightRef}
            className="absolute inset-0 p-2  overflow-auto pointer-events-none whitespace-pre-wrap break-words rounded-none"
          >
            <SyntaxHighlighter
              language={language}
              style={theme === "light" ? docco : dracula}
              // wrapLines='true'
              wrapLongLines={true}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: 0,
                height: "calc(100vh-5rem)",
              }}
            >
              {content || " "}
            </SyntaxHighlighter>
          </div>

          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onScroll={syncScroll}
            className="absolute inset-0 p-2 bg-transparent text-transparent caret-black resize-none overflow-auto z-10 outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
