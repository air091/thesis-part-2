import pool from "../storage/database.js";

export const insertCard = async (cardId) => {
  const insertQuery = `INSERT INTO rfid_cards (card_id)
                        VALUES (?)`;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(insertQuery, [cardId]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Insert card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// select
export const selectCards = async () => {
  const selectQuery = `SELECT * FROM rfid_cards`;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(selectQuery);
    return rows;
  } catch (error) {
    console.error(`Select card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const selectCardById = async (cardId) => {
  const selectQuery = `SELECT * FROM rfid_cards
                      WHERE card_id = ?`;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(selectQuery, [cardId]);
    return rows;
  } catch (error) {
    console.error(`Select card by id ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const updateCard = async (cardId, status, cardIdParam) => {
  const fields = [];
  const values = [];

  if (cardId !== undefined) {
    fields.push("card_id = ?");
    values.push(cardId);
  }

  if (status !== undefined) {
    fields.push("status = ?");
    values.push(status);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update.");
  }

  const updateQuery = `
      UPDATE rfid_cards
      SET ${fields.join(", ")}
      WHERE card_id = ?
    `;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(updateQuery, [
      ...values,
      cardIdParam,
    ]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Update card: ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteCard = async (cardId) => {
  const deleteQuery = `DELETE FROM rfid_cards
                    WHERE card_id = ?`;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(deleteQuery, [cardId]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Delete card ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};
