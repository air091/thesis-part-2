import express from "express";
import {
  postSession,
  getSession,
  putSession,
  deleteSessionController,
  deleteAllSessionController,
} from "../controllers/sessionController.js";

const router = express.Router();

router.delete("/truncate", deleteAllSessionController);
router.post("/", postSession);
router.get("/", getSession);
router.put("/:sessionId", putSession);
router.delete("/:sessionId", deleteSessionController);

export default router;
