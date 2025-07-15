import { pool } from "../models/pgConfig.js";
import "dotenv/config";

// Add this debugging code
console.log("Database connection config:", {
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  passwordProvided: process.env.PASSWORD ? "Yes" : "No",
  port: process.env.DB_PORT,
});

export const connectionMiddleware = async (req, res, next) => {
  try {
    // Get a client from the pool for this request
    req.client = await pool.connect();
    console.log("Successfully connected to database!");

    // Continue to next middleware
    next();

    // Release client back to pool when response is finished
    res.on("finish", () => {
      if (req.client) {
        req.client.release();
      }
    });
  } catch (err) {
    console.error("Error connecting to PostgreSQL database", err);
    res.status(500).json({ error: "Database connection error" });
  }
};
