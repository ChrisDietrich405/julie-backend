import { DataSource } from "typeorm";
import User from "../entities/User";
import Order from "../entities/Order";
import DeliveryAddress from "../entities/DeliveryAddress";
import Customer from "../entities/Customer";

const AppDataSource = new DataSource({
  type: "mongodb",
  database: "julie-website",
  synchronize: true,
  entities: [User, Order, DeliveryAddress, Customer],
  url: "mongodb+srv://chrisdietrich366:Devindiet1@dietrichlandcare.kq6v5mn.mongodb.net/julie-website",
});

AppDataSource.initialize()
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

export default AppDataSource;
