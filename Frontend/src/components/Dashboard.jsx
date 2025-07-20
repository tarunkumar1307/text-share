import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { useStore } from "@/store/store";
import { generateContext, fetchCustomData } from "@/lib/functions";
import { Copy, Check, Menu, X } from "lucide-react";
import AnimatedWordCycle from "@/components/ui/animated-text-cycle";

const Dashboard = () => {
  const { id } = useParams();
  const { shareID, updateShareID } = useStore();
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [customShareID, setCustomShareID] = useState();
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { theme } = useTheme();
  useEffect(() => {
    if (id) {
      setCustomShareID(id);
      updateShareID(id);
      fetchCustomData(id, setContent);
    }
  }, [id]);

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const copytoclipboard = async () => {
    navigator.clipboard.writeText(content).then(() => {
      toast("Content copied to clipboard", {
        type: "success",
      });
    });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // For scrolling the textarea and the syntax highlighter at same time
  const highlightRef = useRef();
  const inputRef = useRef();
  const syncScroll = () => {
    highlightRef.current.scrollTop = inputRef.current.scrollTop;
    highlightRef.current.scrollLeft = inputRef.current.scrollLeft;
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-between items-center border-b-2 border-border p-2">
        <Button variant="ghost" onClick={toggleControls} className="p-2">
          {showControls ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
          <span className="ml-2">
            {showControls ? "Hide Controls" : "Show Controls"}
          </span>
        </Button>
        <div className="flex items-center">
          <span className="text-sm mr-2">
            {content?.length} chars | {content?.split("\n").length} lines
          </span>
        </div>
      </div>

      {/* Left side - Controls */}
      <div
        className={`${
          showControls ? "flex" : "hidden"
        } flex-col w-full md:w-1/3 lg:w-[30%] border-r-2 border-border bg-card`}
      >
        <div className="flex flex-col border-b-2 border-border">
          <div className="border-b-2 border-border uppercase font-bold tracking-wider">
            <div className="p-4 md:p-6 lg:p-8 w-fit">CONTEXT ID</div>
          </div>
          <div className="flex">
            <input
              type="text"
              value={customShareID}
              onChange={(e) => setCustomShareID(e.target.value)}
              placeholder={shareID || "Share ID"}
              className="w-full border-none p-4 md:p-6 lg:p-8 text-lg md:text-xl lg:text-2xl bg-card text-card-foreground rounded-none focus-visible:ring-0"
            />
            <Button
              onClick={() => fetchCustomData(customShareID, setContent)}
              className="px-4 h-full md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 font-bold"
            >
              FETCH
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="text-xs uppercase tracking-wider font-bold border-b-2 border-border hidden md:block">
            <div className="border-r-2 p-4 md:p-6 lg:p-8 border-border h-full w-fit">
              {content?.length} characters | {content?.split("\n").length} lines
            </div>
          </div>

          <div className="flex justify-between items-center p-4 md:p-6 lg:p-8 border-b-2 border-border">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-light text-left text-muted-foreground">
              Share your{" "}
              <AnimatedWordCycle
                words={[
                  "snippets",
                  "code",
                  "notes",
                  "documentation",
                  "ideas",
                  "solutions",
                  "algorithms",
                  "templates",
                ]}
                interval={3000}
                className={"text-foreground font-semi-bold"}
              />
            </h1>
          </div>
          {shareID && shareID != "" && (
            <div className="flex items-center justify-center h-full p-4">
              <QRCode
                size={128}
                className="w-full max-w-48 md:max-w-56 lg:max-w-64"
                value={url}
                viewBox={`0 0 128 128`}
                fgColor="var(--foreground)"
                bgColor="var(--background)"
              />
            </div>
          )}
          <div className="grid grid-cols-2 w-full mt-auto">
            <Button
              className="h-full px-4 md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 font-bold"
              onClick={() =>
                generateContext(shareID, content, setUrl, updateShareID)
              }
            >
              {shareID && shareID != "" ? "UPDATE" : "CREATE"}
            </Button>


            <Button
              variant="outline"
              className="h-full border-t-2 px-4 md:px-6 lg:px-8 py-5 md:py-5 lg:py-6  rounded-none font-bold"
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

      {/* Right side editor */}
      <div
        className={`w-full ${
          showControls ? "md:w-2/3 lg:w-[70%]" : "w-full"
        } h-[calc(100vh-5rem)]`}
      >
        <div className="flex justify-between border-b-2">
          <Button
            className="w-fit h-full p-3 md:p-4 py-4 md:py-6"
            onClick={copytoclipboard}
          >
            {copied ? (
              <Check className="size-4 mx-2 md:mx-4 text-primary" />
            ) : (
              <Copy className="size-4 mx-2 md:mx-4" />
            )}
          </Button>
        </div>
        <div className="relative w-full h-[calc(100vh-10rem)]">
          <div
            ref={highlightRef}
            className="absolute inset-0 p-2 overflow-auto pointer-events-none whitespace-pre-wrap break-words rounded-none"
          >
            {content || " "}
          </div>

          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onScroll={syncScroll}
            className="absolute inset-0 p-2 bg-transparent text-transparent caret-foreground resize-none overflow-auto z-10 outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
