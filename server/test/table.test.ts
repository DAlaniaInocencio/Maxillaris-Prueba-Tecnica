import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import { AppDataSource } from "../src/config/database";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Database Tables", () => {
  it("Debería ser existir la tabla users", async () => {
    const tableName = "users";

    const result: [] = await AppDataSource.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name = $1`,
      [tableName]
    );

    // Verifica si la tabla existe
    expect(result.length).toBeGreaterThan(0);
  });

  it("Debería ser existir la tabla files", async () => {
    const tableName = "files";

    const result: [] = await AppDataSource.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name = $1`,
      [tableName]
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it("Debería no existir la tabla prueba", async () => {
    const tableName = "prueba";

    const result: [] = await AppDataSource.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name = $1`,
      [tableName]
    );

    // Debe ser 0 porque la tabla no debería existir
    expect(result.length).toBe(0);
  });
});
