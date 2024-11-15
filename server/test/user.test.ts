import { describe, it, expect, beforeAll, afterAll, test } from "@jest/globals";
import request from "supertest";
import Server from "../src/app";
import express from "express";

let app: express.Application;

beforeAll(async () => {
  const server = new Server(); 
  app = server.app; 

  await server.start();
});

describe("GET /api/users", () => {
  test("Debería obtener todos los usuarios", async () => {
    const response = await request(app).get("/api/users").send();

    expect(response.statusCode).toBe(200);
  });

  test("Debería obtener array de los usuarios", async () => {
    const response = await request(app).get("/api/users").send();

    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /api/users", () => {
  const userData = {
    name: "example",
    email: "example@gmail.com",
    password: "12345asb",
  };

  test("Debería responder con un estado 201", async () => {
    const response = await request(app).post("/api/users").send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      name: userData.name,
      email: userData.email,
      id: expect.any(Number),
    });
  });

  test("Debería responder con un estado 409 porque ya existe el usuario", async () => {
    const response = await request(app).post("/api/users").send(userData);

    expect(response.statusCode).toBe(409);
  });
});
