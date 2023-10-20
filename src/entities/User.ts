import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export default class User {
  @ObjectIdColumn()
  id: Object;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  constructor(

    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
  
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
