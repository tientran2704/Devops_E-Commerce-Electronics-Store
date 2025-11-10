import mysql from "mysql2/promise";

// Cấu hình database connection
// - Nếu chạy trong Docker: docker-compose sẽ set DB_HOST=db, DB_PORT=3306
// - Nếu chạy local (npm run dev): mặc định dùng localhost:3307 (port được map ra host)
const {
	DB_HOST = "localhost", // Mặc định localhost cho local dev, Docker sẽ override thành "db"
	DB_PORT = "3307", // Mặc định port 3307 (map từ container), Docker sẽ override thành 3306
	DB_USER = "ecomuser",
	DB_PASSWORD = "ecompass",
	DB_NAME = "ecommerce"
} = process.env;

console.log(`[DB Config] Connecting to ${DB_HOST}:${DB_PORT}, database: ${DB_NAME}`);

export const dbPool = mysql.createPool({
	host: DB_HOST,
	port: Number(DB_PORT),
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	// Retry connection nếu fail
	acquireTimeout: 60000,
	timeout: 60000
});


