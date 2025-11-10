import mysql from "mysql2/promise";

const {
	DB_HOST = "db",
	DB_PORT = "3306",
	DB_USER = "ecomuser",
	DB_PASSWORD = "ecompass",
	DB_NAME = "ecommerce"
} = process.env;

export const dbPool = mysql.createPool({
	host: DB_HOST,
	port: Number(DB_PORT),
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});


