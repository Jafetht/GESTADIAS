const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gestadias",
  password: "210726",
  port: 5432
});

module.exports = pool;