import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import AppDataSource from "../config/db";
import User from "../entities/User";
import jwt from "jsonwebtoken";

class AuthController {
  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please add all necessary information" });
    }

    try {
      const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!email.match(emailFormat)) {
        return res.status(400).json({ message: "Wrong email format" });
      }

      const existingUser = await AppDataSource.manager.findOneBy(User, {
        email,
      });

      if (existingUser) {
        return res.status(400).json({ message: "Duplicate user" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User(firstName, lastName, email, hashedPassword);

      await AppDataSource.manager.save(newUser);

      return res.status(201).json({ message: "User created" });
    } catch (error) {
      return res.status(500).json({ message: "Server failed" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please add all necessary information" });
    }

    try {
      const findUser = await AppDataSource.manager.findOneBy(User, {
        email,
      });

      if (!findUser) {
        return res.status(400).json({ message: "Bad request" });
      }

      const matchPassword = await bcrypt.compare(password, findUser.password);
      if (!matchPassword) {
        return res.status(400).json({ message: "Bad request" });
      }

      const token = jwt.sign(
        { id: findUser.id.toString() },

        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      return res.json({ token, expiresIn: "1d", createDate: new Date() });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default new AuthController();
