import { Request } from "express";

interface LoggedInUser {
  id: string;
  isAdmin: boolean;
}

export interface CustomRequest extends Request {
  loggedInUser?: LoggedInUser;
}
