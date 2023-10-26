import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../interfaces/userId";

interface JwtPayload {
  id: number;
  isAdmin: boolean;
}

class Auth {
  async validation(req: CustomRequest, res: Response, next: NextFunction) {
    let token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id, isAdmin } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.loggedInUser = { id, isAdmin };
    next();
  }
}

export default Auth;
