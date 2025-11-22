import {
  postPayment,
  getPayments,
  putPayments,
  deletePaymentController,
  deleteAllPayment,
} from "../controllers/paymentController.js";
import express from "express";

const router = express.Router();

router.delete("/truncate", deleteAllPayment);
router.post("/", postPayment);
router.get("/", getPayments);
router.put("/:paymentId", putPayments);
router.delete("/:paymentId", deletePaymentController);

export default router;
