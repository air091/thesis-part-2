import {
  insertPayment,
  selectPayment,
  updatePayment,
  deletePayment,
  truncatePayments,
} from "../services/paymentService.js";

export const postPayment = async (request, response) => {
  try {
    const { sessionId, amount, method, paidAt } = request.body;
    if (!sessionId || !amount || !method || !paidAt)
      return response.status(400).json({ message: "All fields are required." });

    await insertPayment(sessionId, amount, method, paidAt);
    response.status(201).json({ message: "Payment created successfully." });
  } catch (error) {
    console.error(`Post payment ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

export const getPayments = async (request, response) => {
  try {
    const payments = await selectPayment();
    if (payments.length === 0)
      return response.status(404).json({ message: "No payments found." });

    response
      .status(200)
      .json({ message: "Payments fetched successfully.", payments });
  } catch (error) {
    console.error(`Post payment ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

export const putPayments = async (request, response) => {
  try {
    const { paymentId } = request.params;
    const { sessionId, amount, method, paidAt } = request.body;

    if (!paymentId)
      return response.status(400).json({ message: "Payment Id is required" });

    const updatedPayment = await updatePayment(
      sessionId,
      amount,
      method,
      paidAt
    );
    if (updatedPayment.affectedRows === 0)
      return response.status(404).json({ message: "No payment found." });

    response
      .status(200)
      .json({ message: "Payments updated successfully.", updatedPayment });
  } catch (error) {
    console.error(`Put payment ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

export const deletePaymentController = async (request, response) => {
  try {
    const { paymentId } = request.params;
    if (!paymentId)
      return response.status(400).json({ message: "Payment Id is required." });
    const deletedPayment = await deletePayment(paymentId);
    if (deletedPayment.affectedRows === 0)
      return response.status(404).json({ message: "Payment not found." });
    response.status(200).json({ message: "Payment deleted successfully." });
  } catch (error) {
    console.error(`Delete Payment controller ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

// delete all
export const deleteAllPayment = async (request, response) => {
  try {
    const truncate = await truncatePayments();
    response.status(200).json({ message: truncate.message });
  } catch (error) {
    console.error(`Truncate Payment controller ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};
