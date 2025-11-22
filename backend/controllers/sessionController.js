import { selectCardById } from "../services/cardService.js";
import { insertPayment } from "../services/paymentService.js";
import {
  insertSession,
  selectSessions,
  updateSession,
  deleteSession,
  truncateSession,
  selectSessionById,
} from "../services/sessionService.js";

// post
export const postSession = async (request, response) => {
  try {
    const { cardId, timeIn } = request.body;
    if (!cardId || !timeIn)
      return response.status(400).json({ message: "All fields are required" });

    const validateCard = await selectCardById(cardId);
    if (validateCard.length === 0)
      return response.status(404).json({ message: "Card ID not found." });

    const session = await insertSession(cardId, timeIn);
    const sessionId = session.insertId;

    const amount = 30.0;
    const method = "coin";
    await insertPayment(sessionId, amount, method, timeIn);

    response.status(201).json({ message: "Session created succesfully." });
  } catch (error) {
    console.error(`Post session ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

// get
export const getSession = async (request, response) => {
  try {
    const sessions = await selectSessions();
    if (sessions.length === 0)
      return response.status(404).json({ message: "No sessions found." });
    response
      .status(200)
      .json({ message: "Sessions fetched successfully.", sessions });
  } catch (error) {
    console.error(`Get sessions ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

// update
export const putSession = async (request, response) => {
  try {
    const { sessionId } = request.params;
    const { timeOut } = request.body;

    if (!sessionId)
      return response.status(400).json({ message: "Session Id is required." });

    // get session info by its id and return its timein
    const session = await selectSessionById(sessionId);
    if (!session)
      return response.status(400).json({ message: "Session not found." });
    const sessionTimeIn = session.time_in;

    const timeInDate = new Date(sessionTimeIn);
    const timeOutDate = new Date(timeOut);
    const diffMs = timeOutDate - timeInDate;

    const diffMinutes = diffMs / 1000 / 60; // total minutes
    let durationStr;
    let addFees = 0;

    if (diffMinutes < 60) {
      durationStr = `${Math.floor(diffMinutes)} mins`;
      addFees = 0; // less than 1 hr, no fee
    } else {
      // calculate hours
      const durationHours = Math.floor(diffMinutes / 60);
      durationStr = `${durationHours} ${durationHours > 1 ? "hrs" : "hr"}`;

      // fee calculation: first 2 hours free
      if (durationHours > 2) {
        addFees = 10 + (durationHours - 2) * 20;
      } else {
        addFees = 0;
      }
    }

    const updatedSession = await updateSession(
      timeOut,
      addFees,
      addFees > 1 ? 0 : 1,
      durationStr,
      sessionId
    );
    if (updatedSession.affectedRows === 0)
      return response.status(404).json({ message: "No session found." });
    response.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    console.error(`Put session ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

// delete
export const deleteSessionController = async (request, response) => {
  try {
    const { sessionId } = request.params;
    if (!sessionId)
      return response.status(400).json({ message: "Session id is required." });
    const deletedSession = await deleteSession(sessionId);
    if (deletedSession.length === 0)
      return response.status(404).json({ message: "No session found." });
    response.status(200).json({ message: "Session deleted successfully." });
  } catch (error) {
    console.error(`Put sessions ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

// DELETE ALL
export const deleteAllSessionController = async (request, response) => {
  try {
    await truncateSession();
    response.status(200).json({ message: "Truncated successfully." });
  } catch (error) {
    console.error(`Truncate session controller ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};
