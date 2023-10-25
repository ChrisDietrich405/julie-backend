import { Request, Response } from "express";
import Order from "../entities/Order";
import Customer from "../entities/Customer";
import DeliveryAddress from "../entities/DeliveryAddress";
import AppDataSource from "../config/db";

class OrderController {
  async save(req: Request, res: Response) {
    const {
      status,
      totalCost,
      quantity,
      customer,
      total,
      deliveryCost,
      deliveryAddress,
    } = req.body;

    const { firstName, lastName, documentation } = customer;

    const newCustomer = new Customer(firstName, lastName, documentation);

    const savedCustomer = await AppDataSource.manager.save(newCustomer);

    const newOrder = new Order(
      status,
      totalCost,
      total,
      quantity,
      deliveryCost,
      savedCustomer.id,
      deliveryAddress
    );

    await AppDataSource.manager.save(newOrder);

    return res.status(201).json(newOrder);
  }

  async listAllOrders(req: Request, res: Response) {
    const findOrders = await AppDataSource.manager.find(Order);

    const customer = await AppDataSource.manager.findOneBy(Customer, {
      documentation: "333333333",
    });

    const orderResponse = findOrders.map((order) => {
      return {
        status: order.status,
        totalCost: order.totalCost,
        quantity: order.quantity,
        customer: {
          firstName: customer?.firstName,
          lastName: customer?.lastName,
          documentation: customer?.documentation,
        },
        total: order.total,
        deliveryCost: order.deliveryCost,
        deliveryAddress: {
          streetAddress: order.deliveryAddress.streetAddress,
          city: order.deliveryAddress.city,
          state: order.deliveryAddress.state,
          zipCode: order.deliveryAddress.zipCode,
          country: order.deliveryAddress.country,
        },
      };
    });

    return res.status(200).json(orderResponse);
  }

  async findOrderByCustomerId() {

  }
}

export default new OrderController();
