const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "rai_addresses.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS households (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rai_code TEXT UNIQUE NOT NULL,
    owner_name TEXT,
    phone TEXT,
    province TEXT,
    district TEXT,
    sector TEXT,
    cell TEXT,
    village TEXT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;

