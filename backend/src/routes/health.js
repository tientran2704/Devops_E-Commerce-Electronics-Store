import { Router } from "express";
import { dbPool } from "../lib/db.js";

const router = Router();

router.get("/", (req, res) => {
	res.json({ status: "ok" });
});

router.get("/db", async (req, res) => {
	try {
		const [rows] = await dbPool.query("SELECT 1 as ok");
		res.json({ db: rows[0].ok === 1 ? "ok" : "fail" });
	} catch {
		res.status(500).json({ db: "fail" });
	}
});

export default router;


