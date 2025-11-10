import { Router } from "express";
import { dbPool } from "../lib/db.js";

const router = Router();

router.get("/", (req, res) => {
	res.json({ status: "ok" });
});

router.get("/db", async (req, res) => {
	try {
		const [rows] = await dbPool.query("SELECT 1 as ok");
		// Kiểm tra table users có tồn tại không
		const [tables] = await dbPool.query("SHOW TABLES LIKE 'users'");
		res.json({ 
			db: rows[0].ok === 1 ? "ok" : "fail",
			tables: tables.length > 0 ? "ok" : "missing",
			usersTable: tables.length > 0
		});
	} catch (error) {
		console.error("Database health check error:", error);
		res.status(500).json({ 
			db: "fail", 
			error: error.message,
			code: error.code 
		});
	}
});

export default router;


