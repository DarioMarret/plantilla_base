import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "",
    user: "",
    password:"",
    database: "",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export { pool }