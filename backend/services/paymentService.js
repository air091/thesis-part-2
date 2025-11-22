import pool from "../storage/database.js";

// insert
export const insertPayment = async (sessionId, amount, method, paidAt) => {
  const insertQuery = `INSERT INTO payments (session_id, amount, method, paid_at)
                        VALUES (?, ?, ?, ?)`;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(insertQuery, [
      sessionId,
      amount,
      method,
      paidAt,
    ]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Insert payment ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// select
export const selectPayment = async () => {
  const selectQuery = `SELECT * FROM payments`;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(selectQuery);
    return rows;
  } catch (error) {
    console.error(`Select payment ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// update
export const updatePayment = async (
  sessionId,
  amount,
  method,
  paidAt,
  paymentId
) => {
  const fields = [];
  const values = [];

  if (sessionId !== undefined) {
    fields.push("session_id = ?");
    values.push(sessionId);
  }
  if (amount !== undefined) {
    fields.push("amount = ?");
    values.push(amount);
  }
  if (method !== undefined) {
    fields.push("method = ?");
    values.push(method);
  }
  if (paidAt !== undefined) {
    fields.push("paid_at = ?");
    values.push(paidAt);
  }

  if (fields.length === 0) throw new Error("No fields provided to update.");
  const updateQuery = `UPDATE payments
                    SET ${fields.join(", ")}
                    WHERE payment_id = ?
                    `;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(updateQuery, [
      ...values,
      paymentId,
    ]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Update payment ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// delete
export const deletePayment = async (paymentId) => {
  const deleteQuery = `DELETE FROM payments
                        WHRE payment_id = ?`;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(deleteQuery, [paymentId]);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.error(`Delete payment ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

// delete all
export const truncatePayments = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);
    await connection.execute(`TRUNCATE payments;`);
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 1;`);

    await connection.commit();
    return { message: "Payments truncated successfully" };
  } catch (error) {
    await connection.rollback();
    console.error(`Truncate payment ${error.message}`);
  } finally {
    connection.release();
  }
};
