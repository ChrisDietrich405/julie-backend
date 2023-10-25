import { Router } from "express";
import orderController from "../controllers/orderController";

const router = Router();

router.post("/", orderController.save);
router.get("/", orderController.listAllOrders);

export default router;
