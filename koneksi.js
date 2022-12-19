var mysql = require("mysql");

const pool = mysql.createPool({
  host: "sql.freedb.tech",
  port: "3306",
  user: "freedb_user_library",
  password: "e8rWqH@6#Ca@kWf",
  database: "freedb_db_library",
});

// const pool = mysql.createPool({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "",
//   database: "fb_library",
// });

// ... later
pool.query("select 1 + 1", (err, rows) => {
  /* */
});

module.exports = pool;
