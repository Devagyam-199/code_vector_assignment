import pool from "../database/dbConn.js";
import { encodeParams, decodeParams } from "../utils/queryParamsCoder.utils.js";
const paginationController = async (req, res) => {
  //   try {
  //     const limit = parseInt(req.query.limit) || 20;
  //     const { rows } = await pool.query(
  //       `SELECT id, name, category, price, created_at
  //        FROM products
  //        ORDER BY created_at DESC, id DESC
  //        LIMIT $1`,
  //       [limit],
  //     );
  //     return res.json({ data: rows });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }

  const { category, cursor, limit } = req.query;
  let lim = Math.min(parseInt(limit) || 20, 10000);;
  const conditions = [];
  const params = [];
  let p = 1;

  const cursorData = cursor ? decodeParams(cursor) : null;

  if (category) {
    conditions.push(`category = $${p++}`);
    params.push(category);
  }

  if (cursorData) {
    conditions.push(`(created_at, id) < ($${p++}, $${p++})`);
    params.push(cursorData.createdAt, cursorData.id);
  }

  let whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  params.push(lim);
  let limitParams = `$${p++}`;

  const query = `
    SELECT id, name, category, price, created_at, updated_at
    FROM products
    ${whereClause}
    ORDER BY created_at DESC, id DESC
    LIMIT ${limitParams}
  `;

  try {
    const { rows } = await pool.query(query, params);
    const last = rows[rows.length - 1];
    const nextCursor = last ? encodeParams(last.created_at, last.id) : null;
    res.json({
      data: rows,
      nextCursor,
      hasMore: rows.length === lim,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export default paginationController;
