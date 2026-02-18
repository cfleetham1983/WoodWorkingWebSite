import path from "node:path";
import express from "express";
import Database from "better-sqlite3";

const app = express();
const port = Number(process.env.API_PORT || 3001);
const dbPath = path.resolve(process.cwd(), "database", "shop_suppliers.db");

const db = new Database(dbPath, { readonly: true, fileMustExist: true });

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/shop-suppliers", (req, res) => {
  const type = String(req.query.type || "").toLowerCase();

  if (!type || !["wood", "tools"].includes(type)) {
    res.status(400).json({
      error: "Invalid type query. Use ?type=wood or ?type=tools",
    });
    return;
  }

  const supplyTypes =
    type === "wood" ? ["wood", "both"] : ["tools", "both"];

  const statement = db.prepare(`
    SELECT
      id,
      shop_name,
      supply_type,
      city,
      state,
      website_url,
      phone,
      notes
    FROM shop_suppliers
    WHERE supply_type IN (?, ?)
    ORDER BY shop_name ASC
  `);

  const data = statement.all(supplyTypes[0], supplyTypes[1]);
  res.json({ data });
});

app.use((err, _req, res, _next) => {
  // Surface API errors as JSON for the frontend.
  res.status(500).json({ error: err?.message || "Internal server error" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Shop suppliers API listening on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  db.close();
  process.exit(0);
});
