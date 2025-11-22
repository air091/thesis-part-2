import {
  insertCard,
  selectCards,
  updateCard,
  deleteCard,
} from "../services/cardService.js";

export const postCard = async (request, response) => {
  try {
    const { cardId } = request.body;
    console.log("Received card:", cardId);
    if (!cardId)
      return response.status(400).json({ message: "Card is required." });
    await insertCard(cardId);
    response.status(201).json({ message: "Card created successfully." });
  } catch (error) {
    console.error(`Post card ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

export const getCards = async (request, response) => {
  try {
    const cards = await selectCards();
    if (cards.length === 0)
      return response.status(404).json({ message: "No cards found." });
    response
      .status(200)
      .json({ message: "Cards fetched successfully", cards: cards });
  } catch (error) {
    console.error(`Get card ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

export const updateCardController = async (request, response) => {
  try {
    const { cardIdParam } = request.params;
    const { cardId, status } = request.body;

    if (!cardIdParam)
      return response
        .status(400)
        .json({ message: "Card Id params is required" });

    const updatedCard = await updateCard(cardId, status, cardIdParam);
    if (updatedCard.affectedRows === 0)
      return response.status(404).json({ message: "Card not found." });

    response
      .status(200)
      .json({ message: "Card updated successfully.", updatedCard });
  } catch (error) {
    console.error(`Update card controller ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};

export const deleteCardController = async (request, response) => {
  try {
    const { cardIdParam } = request.params;
    if (!cardIdParam)
      return response.status(400).json({ message: "Card Id is required." });
    const deletedCard = await deleteCard(cardIdParam);
    if (deletedCard.affectedRows === 0)
      return response.status(404).json({ message: "Card not found." });
    response.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    console.error(`Delete card controller ${error.message}`);
    response.status(500).json({ message: error.message });
  }
};
