import axios from "axios";
import { toast } from "sonner";

export const generateContext = async (
  shareID,
  content,
  setUrl,
  updateShareID
) => {
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
      toast("Context updated successfully", {
        type: "success",
      });
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
      toast("Context generated successfully", {
        type: "success",
      });
      console.log(response.data.id);
    } catch (error) {
      console.error("Error generating context:", error);
    }
  }
};
export const fetchCustomData = async (customShareID, setContent) => {
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
