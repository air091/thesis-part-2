import "dotenv/config";
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected");
    connection.release();
  } catch (error) {
    console.log(`Database connection failed ${error.message}`);
  }
};

checkConnection();
