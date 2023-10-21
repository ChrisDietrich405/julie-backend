import { Entity, ObjectIdColumn, Column } from "typeorm";
import Customer from "../models/Customer";

@Entity()
export default class DeliveryAddress {
  @ObjectIdColumn()
  id: Object;

  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: number;

  @Column()
  country: string;

  constructor(
    streetAddress: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
  ) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }
}
