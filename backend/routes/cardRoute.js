import express from "express";
import {
  deleteCardController,
  getCards,
  postCard,
  updateCardController,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", postCard);
router.get("/", getCards);
router.put("/:cardIdParam", updateCardController);
router.delete("/:cardIdParam", deleteCardController);

export default router;
