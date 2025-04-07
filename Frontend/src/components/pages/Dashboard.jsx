import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { useStore } from "@/store/store";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Dashboard = () => {
  const [content, setContent] = useState("");
  const { shareID, updateShareID } = useStore();
  const [url, setUrl] = useState("");
  const [customShareID, setCustomShareID] = useState("");

  const generateContext = async () => {
    if (shareID) {
      try {
        const response = await axios.post(
          "http://localhost:3000/update_context",
          {
            shareID: shareID,
            content: content,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating context:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/generate_context",
          { content: content }
        );
        updateShareID(response.data.id);
        setUrl(`http://localhost:3000/share/${response.data.id}`);
        console.log(response.data.id);
      } catch (error) {
        console.error("Error generating context:", error);
      }
    }
  };
  const fetchCustomData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/share/${customShareID}`
      );
      console.log("response data of share ", response.data);
      if (response.data && response.data.content) {
        setContent(response.data.content);
      } else {
        setContent(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="">
      <div className="flex w-full items-center justify-between bg-background ">
        <Textarea
          onChange={(e) => setCustomShareID(e.target.value)}
          placeholder={shareID}
        />
        <Button className="" onClick={fetchCustomData}>
          Hit it
        </Button>
      </div>
      <div className="flex-1 overflow-hidden border  bg-background shadow-sm">
        <div className="relative min-h-[400px] w-full">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[400px] w-full resize-none border-0 bg-background font-mono text-sm shadow-none focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={generateContext}
          >
            Create Context
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Share
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                {shareID ? (
                  <SheetTitle>Please create context before sharing.</SheetTitle>
                ) : (
                  <>
                    <SheetTitle>Here's your QR Code</SheetTitle>
                    <SheetDescription>
                      <QRCode
                        size={256}
                        className="h-full w-full"
                        value={url}
                        viewBox={`0 0 256 256`}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                      />
                      <a>{url}</a>
                    </SheetDescription>
                  </>
                )}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-sm text-muted-foreground">
          {content?.length} characters | {content?.split("\n").length} lines
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
