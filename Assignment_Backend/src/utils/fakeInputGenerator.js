import { faker } from "@faker-js/faker";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import pool from "../database/dbConn.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ensureSchema = async () => {
  const schemaPath = path.join(__dirname, "../database/schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  await pool.query(schemaSql);
  console.log("Schema ensured (table + indexes ready)");
};

const seedBatch = async (batchSize) => {
  let valueSql = [];
  let params = [];
  let p = 1;

  for (let i = 0; i < batchSize; i++) {
    const name = faker.commerce.productName();
    const category = faker.commerce.department();
    const price = faker.commerce.price();
    const createdAt = faker.date.past({ years: 1 });

    valueSql.push(`($${p++},$${p++},$${p++},$${p++},$${p++})`);
    params.push(name, category, price, createdAt, createdAt);
  }

  await pool.query(
    `INSERT INTO products (name, category, price, created_at, updated_at) VALUES ${valueSql.join(",")}`,
    params,
  );
};

const seedAll = async (total = 200000, batchSize = 10000) => {
  await ensureSchema();

  for (let i = 0; i < total; i += batchSize) {
    const start = Date.now();
    await seedBatch(batchSize);
    console.log(
      `seeding done for ${i + batchSize} / ${total} - took ${Date.now() - start} ms`,
    );
  }
};

export default seedAll;