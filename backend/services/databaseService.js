import { response } from "express";
import { pool } from "../storage/database.js";

export const insertCard = async (cardID) => {
  const insertQuery = `
                      INSERT INTO rfid_cards (card_id)
                      VALUE (?)
                      `;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(insertQuery, [cardID]);
    await connection.commit();
    return { insertedId: rows.insertedId, affectedRows: rows.affectedRows };
  } catch (error) {
    await connection.rollback();
    console.log(`Set card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const selectAllCards = async () => {
  const selectQuery = `
                      SELECT * FROM rfid_cards
                      `;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(selectQuery);
    return rows;
  } catch (error) {
    console.log(`Get cards ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const selectIdCard = async (cardID) => {
  const selectQuery = `
                      SELECT * FROM rfid_cards WHERE card_id = ?
                      `;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(selectQuery, [cardID]);
    return rows[0];
  } catch (error) {
    console.log(`Get card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const updateByIdCard = async (status, cardID) => {
  const updateQuery = `
                      UPDATE rfid_cards
                      SET status = ?
                      WHERE card_id = ?
                      `;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(updateQuery, [status, cardID]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.log(`Update card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteByIdCard = async (cardID) => {
  const deleteQuery = `
                      DELETE FROM rfid_cards
                      WHERE card_id = ?
                      `;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(deleteQuery, [cardID]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.log(`Delete card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};
