import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export default class Customer {
  @ObjectIdColumn()
  id: Object;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  documentation: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  constructor(firstName: string, lastName: string, documentation: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.documentation = documentation;
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
