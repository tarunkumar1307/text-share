import express, { json, urlencoded } from "express";
import cors from "cors";
import { pool } from "./models/pgConfig.js";
import { connectionMiddleware } from "./middlewares/connection.js";
import { createTableMiddleware } from "./middlewares/createTable.js";
import { insetData } from "./utils/insertData.js";
import { updateData } from "./utils/updateData.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Middlewares
app.use(connectionMiddleware);
app.use(createTableMiddleware(pool));

app.get("/", (req, res) => {
  res.send("Helowwwww!");
});

app.post("/generate_context", async (req, res) => {
  const content = req.body.content;
  console.log("content -> ", content);
  insetData(req.client, content, res);
});

app.post("/update_context", async (req, res) => {
  const content = req.body.content;
  const id = req.body.shareID;
  updateData(req.client, content, id, res);
});

app.get("/share/:shareID", async (req, res) => {
  const id = req.params.shareID;
  const query = "SELECT * FROM instance WHERE id = $1";
  try {
    const result = await req.client.query(query, [id]);
    console.log("/share/:shareid - ", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0].data);
    } else {
      res.status(404).json({ error: "No rows found" });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on 0.0.0.0:${PORT}`);
});
