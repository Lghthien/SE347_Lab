const sqlite3 = require('sqlite3').verbose();

// Kết nối đến cơ sở dữ liệu SQLite
const db = new sqlite3.Database('./users.db');

// Tạo bảng nếu chưa có
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      description TEXT
    )
  `);
});

module.exports = db;
