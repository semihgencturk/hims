const Pool = require("pg").Pool

const pool = new Pool({
    user: "",
    password: "",
    host: "localhost",
    port: 5433,
    database: "hims"
});

module.exports = pool;
