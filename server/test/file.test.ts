import { describe, it, expect, beforeAll, afterAll, test } from "@jest/globals";
import request from "supertest";
import Server from "../src/app"; // Asegúrate de que esta ruta sea la correcta
import express from "express";
import path from "path";

let app: express.Application;

beforeAll(async () => {
  const server = new Server(); // Asegúrate de que tu clase Server esté bien definida
  app = server.app; // Accede a la instancia de la app Express

  await server.start(); // Esto inicializa la base de datos y la app
});

describe("GET /api/files", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYXJ2aW4uYWxhbmlhQGdtYWlsLmNvbSIsImlhdCI6MTczMTY1NDgxNiwiZXhwIjoxNzMxNjU4NDE2fQ.c1DRWTzh3WQd5HR2Mf1vDlF-xdtHqJGlKfwAG3QG_08";

  const expectedFiles = [
    {
      id: 1,
      peso: 1045,
      tipo: "text/plain",
      cantidad: 1,
    },
  ];

  test("Debería obtener todos archivos", async () => {
    const response = await request(app)
      .get("/api/files")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
  });

  test("Debería obtener array de los archivos", async () => {
    const response = await request(app)
      .get("/api/files")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.body).toBeInstanceOf(Array);
  });

  test("Debería obtener todos los archivos en formato JSON", async () => {
    const response = await request(app)
      .get("/api/files")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(expectedFiles);
  });
});

describe("POST /api/files", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYXJ2aW4uYWxhbmlhQGdtYWlsLmNvbSIsImlhdCI6MTczMTY1NDgxNiwiZXhwIjoxNzMxNjU4NDE2fQ.c1DRWTzh3WQd5HR2Mf1vDlF-xdtHqJGlKfwAG3QG_08";

  test("Debería subir un archivo y devolver la información correcta", async () => {
    // Ruta del archivo para subir
    const filePath = path.join(__dirname, "uploads", "unoeliminar.txt");

    const response = await request(app)
      .post("/api/files")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", filePath) 
      .expect(200); 

    // Verificar que la respuesta contiene los campos correctos
    expect(response.body).toHaveProperty("peso", expect.any(Number));
    expect(response.body).toHaveProperty("tipo", "text/plain");
    expect(response.body).toHaveProperty("cantidad", 1); 

    // Verificar los datos del usuario devueltos
    expect(response.body.user).toHaveProperty("id", 1);
    expect(response.body.user).toHaveProperty("name", "myc");
    expect(response.body.user).toHaveProperty("email", "darvin.alania@gmail.com");
    expect(response.body.user).toHaveProperty("password");
  });
});