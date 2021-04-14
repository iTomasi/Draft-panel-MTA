import mysql from "mysql";
import config from "../config/config";

const connection = mysql.createPool({
    host: config.DB.HOST,
    port: 3306,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
    database: config.DB.DATABASE,
    connectionLimit: 3
});

connection.getConnection(err => {
    if (err) return console.log(err);

    console.log("MySQL Connected " + config.DB.DATABASE)
});

export default connection;