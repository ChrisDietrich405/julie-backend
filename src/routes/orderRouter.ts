import { Router } from "express";
import orderController from "../controllers/orderController";
import Auth from "../middleware/auth";

const auth = new Auth();

const router = Router();

router.post("/", orderController.save);
router.get("/", orderController.listAllOrders);
router.get(
  "/find-order-by-customer-id/:id",
  auth.validation,
  orderController.findOrderByCustomerId
);

export default router;
