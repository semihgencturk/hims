const Pool = require("pg").Pool

const pool = new Pool({
    user: "semihgencturk",
    password: "123456789",
    host: "localhost",
    port: 5433,
    database: "hims"
});

module.exports = pool;