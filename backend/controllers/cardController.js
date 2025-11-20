import {
  insertCard,
  selectAllCards,
  selectIdCard,
  updateByIdCard,
  deleteByIdCard,
} from "../services/databaseService.js";

export const postCard = async (request, response) => {
  try {
    const { cardID } = request.body;
    if (!cardID) throw new Error("Card ID is required.");
    await insertCard(cardID);
    const selectCard = await selectIdCard(cardID);

    response
      .status(201)
      .json({ message: "Card created successfully.", data: selectCard });
  } catch (error) {
    console.log(`Create card ${error}`);
    response.status(500).json({ message: error.message });
  }
};

export const getQueryCardById = async (request, response) => {
  try {
    const { cardID } = request.query;
    if (!cardID)
      return response.status(400).json({ message: "CardID is required." });
    const card = await selectIdCard(cardID);
    if (!card) return response.status(404).json({ message: "Card not found." });
    response
      .status(200)
      .json({ message: "Card fetched successfully.", data: card });
  } catch (error) {
    console.log(`Get card ${error}`);
    response.status(500).json({ message: error.message });
  }
};

export const getCards = async (request, response) => {
  try {
    const cards = await selectAllCards();
    if (cards.length === 0)
      return response.status(404).json({ message: "No cards yet." });
    response
      .status(200)
      .json({ message: "Cards fetched successfully.", data: cards });
  } catch (error) {
    console.log(`Get cards ${error}`);
    response.status(500).json({ message: error.message });
  }
};

export const putCard = async (request, response) => {
  try {
    const { id } = request.params;
    const { status } = request.body;
    if (!id)
      return response.status(400).json({ message: "Card ID is invalid." });
    if (!status)
      return response.status(400).json({ message: "Card status is required." });
    const updatedCard = await updateByIdCard(status, id);
    if (updatedCard.affectedRows === 0)
      return response.status(404).json({ message: "Card not found." });
    return response
      .status(200)
      .json({ message: "Card updated successfully", updatedCard });
  } catch (error) {
    console.log(`Update card ${error}`);
    response.status(500).json({ message: error.message });
  }
};

export const deleteCard = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedCard = await deleteByIdCard(id);
    if (deletedCard.affectedRows === 0)
      return response.status(404).json({ message: "Card not found." });
    response.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.log(`Delete card ${error}`);
    response.status(500).json({ message: error.message });
  }
};
