import { Request, Response } from "express";
import Order from "../entities/Order";
import AppDataSource from "../config/db";

class OrderController {
  async save(req: Request, res: Response) {
    const { status, totalProducts, quantity, customer, total, deliveryCost, deliveryAddress } = req.body;

    const newOrder = new Order(
      status,
      totalProducts,
      total,
      quantity,
      deliveryCost, 
      customer,
      deliveryAddress
    );

    await AppDataSource.manager.save(newOrder);

    return res.status(201).json(newOrder);
  }
}

export default new OrderController();
