import pool from "../storage/database.js";

// insert
export const insertSession = async (cardId, timeIn) => {
  const insertQuery = `INSERT INTO parking_sessions (card_id, time_in)
                        VALUES (?, ?)`;
  const connecton = await pool.getConnection();
  try {
    await connecton.beginTransaction();
    const [result] = await connecton.execute(insertQuery, [cardId, timeIn]);
    await connecton.commit();
    return result;
  } catch (error) {
    await connecton.rollback();
    console.error(`Insert session ${error.message}`);
    throw error;
  } finally {
    connecton.release();
  }
};

// select
export const selectSessions = async () => {
  const selectQuery = `SELECT * FROM parking_sessions`;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(selectQuery);
    return rows;
  } catch (error) {
    console.error(`Select sessions ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const selectSessionById = async (sessionId) => {
  const selectQuery = `SELECT * FROM parking_sessions
                      WHERE session_id = ?`;
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(selectQuery, [sessionId]);
    return results[0];
  } catch (error) {
    console.error(`Select sessions ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// update
export const updateSession = async (
  timeOut,
  additionalFee,
  isComplete,
  duration,
  sessionId
) => {
  const fields = [];
  const values = [];

  if (timeOut !== undefined) {
    fields.push("time_out = ?");
    values.push(timeOut);
  }

  if (additionalFee !== undefined) {
    fields.push("additional_fee = ?");
    values.push(additionalFee);
  }

  if (isComplete !== undefined) {
    fields.push("is_complete = ?");
    values.push(isComplete);
  }

  if (duration !== undefined) {
    fields.push("duration = ?");
    values.push(duration);
  }

  if (fields.length === 0) throw new Error("No fields provided to update.");

  const updateQuery = `
    UPDATE parking_sessions
    SET ${fields.join(", ")}
    WHERE session_id = ?
  `;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(updateQuery, [
      ...values,
      sessionId,
    ]);

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Update session ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// delete
export const deleteSession = async (sessionId) => {
  const deleteQuery = `DELETE FROM parking_sessions 
                        WHERE session_id = ?`;
  const connection = await pool.beginTransaction();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(deleteQuery, [sessionId]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Delete session ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// DELETE ALL
export const truncateSession = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);
    await connection.execute(`TRUNCATE TABLE parking_sessions;`);
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 1;`);

    await connection.commit();
    return { message: "Sessions truncated successfully." };
  } catch (error) {
    await connection.rollback();
    console.error(`Truncate session ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};
