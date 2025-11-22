import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import pool from "./storage/database.js";

// Replace with your Arduino COM port (Windows: COM3, Linux: /dev/ttyUSB0)
const port = new SerialPort({
  path: "COM3",
  baudRate: 115200,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", async (data) => {
  const cardId = data.trim(); // e.g., "B3 48 17 43"
  console.log("Received from Arduino:", cardId);

  if (!cardId) return;

  try {
    const connection = await pool.getConnection();
    await connection.query("INSERT INTO cards (cardId) VALUES (?)", [cardId]);
    connection.release();
    console.log("Card saved to database:", cardId);
  } catch (err) {
    console.error("Error saving card:", err.message);
  }
});

port.on("error", (err) => {
  console.error("Serial port error:", err);
});
