import express from "express";
import {
  postCard,
  getQueryCardById,
  getCards,
  putCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", postCard);

router.get("/query", getQueryCardById);

router.get("/", getCards);

router.put("/:id", putCard);

router.delete("/:id", deleteCard);

export default router;
