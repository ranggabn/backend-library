var mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "db_library",
});

// ... later
pool.query("select 1 + 1", (err, rows) => {
  /* */
});

module.exports = pool;
