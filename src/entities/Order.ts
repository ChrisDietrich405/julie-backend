import { Entity, ObjectIdColumn, Column } from "typeorm";
import DeliveryAddress from "./DeliveryAddress";

@Entity()
export default class Order {
  @ObjectIdColumn()
  id: Object;

  @Column()
  status: string;

  @Column()
  totalCost: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @Column()
  orderCode: string;

  @Column()
  deliveryCost: number;

  @Column()
  customer: Object;
  //this represents the one to one relationship

  @Column((type) => DeliveryAddress)
  deliveryAddress: DeliveryAddress;

  constructor(
    status: string,
    totalCost: number,
    total: number,
    quantity: number,
    deliveryCost: number,
    customer: Object,
    deliveryAddress: DeliveryAddress
  ) {
    this.status = status;
    this.totalCost = totalCost;
    this.total = total;
    this.quantity = quantity;
    this.deliveryCost = deliveryCost;
    this.orderCode = "yqyyaa";
    this.customer = customer;
    this.deliveryAddress = deliveryAddress;
  }
}

// {

//     "address": {
//         "streetAddress": "232 Maple St",
//         "city": "Baltimore",
//         "state": "Maryland",
//         "zipCode": "234576",
//         "country": "USA"
//     },
//     "items": [
//         {
//           "title": "blue shoes",
//           "quantity": 3,
//           "totalValue": 150.00,
//           "unitCost": 50,
//           "productCode": 1
//         },
//          {
//           "title": "red shoes",
//           "quantity": 1,
//           "totalValue": 50.00,
//           "unitCost": 50,
//           "productCode": 2
//         }

//     ]
// }
