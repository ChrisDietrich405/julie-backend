const request = require("supertest");
const { Response, Request } = require("express"); // You may need to adjust this import based on your setup
const bcrypt = require("bcrypt");
const AppDataSource = require("./AppDataSource"); // Import your AppDataSource module
const User = require("./User"); // Import your User module
const app = require("./your-express-app"); // Import your Express app

// Mock bcrypt functions
jest.mock("bcrypt", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

// Mock AppDataSource functions
jest.mock("./AppDataSource", () => ({
  manager: {
    findOneBy: jest.fn(),
    save: jest.fn(),
  },
}));

describe("register function", () => {
  it("should return 400 if not all necessary information is provided", async () => {
    const req = new Request({
      body: {},
    });
    const res = new Response();

    await app.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please add all necessary information",
    });
  });

  it("should return 400 if email format is wrong", async () => {
    const req = new Request({
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        password: "password",
      },
    });
    const res = new Response();

    await app.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Wrong email format" });
  });

  it("should return 400 if the user already exists", async () => {
    const req = new Request({
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "existing@example.com",
        password: "password",
      },
    });
    const res = new Response();

    // Mock findOneBy to return an existing user
    AppDataSource.manager.findOneBy.mockResolvedValue({});

    await app.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Duplicate user" });
  });

  it("should create a new user and return 201 if registration is successful", async () => {
    const req = new Request({
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "new@example.com",
        password: "password",
      },
    });
    const res = new Response();

    // Mock findOneBy to indicate the user does not exist
    AppDataSource.manager.findOneBy.mockResolvedValue(null);

    // Mock bcrypt functions
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock save function to indicate successful user creation
    AppDataSource.manager.save.mockResolvedValue("newUser");

    await app.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User created" });
  });

  it("should return 500 if an error occurs during registration", async () => {
    const req = new Request({
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "new@example.com",
        password: "password",
      },
    });
    const res = new Response();

    // Mock findOneBy to indicate the user does not exist
    AppDataSource.manager.findOneBy.mockResolvedValue(null);

    // Mock bcrypt functions
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockRejectedValue(new Error("bcrypt error"));

    await app.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server failed" });
  });
});
