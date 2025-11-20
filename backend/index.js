import "dotenv/config";
import express from "express";
import cors from "cors";

import pool from "./storage/database.js";
import cardRoute from "./routes/cardRoute.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/cards", cardRoute);

async function startServer() {
  const connection = await pool.getConnection();
  try {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log(`Start server ${error}`);
    process.exit(1);
  } finally {
    connection.release();
  }
}

startServer();
