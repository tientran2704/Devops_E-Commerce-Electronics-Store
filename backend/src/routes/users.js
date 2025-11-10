import { Router } from "express";
import Joi from "joi";
import { dbPool } from "../lib/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const profileSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	phone: Joi.string().allow("", null)
});

router.get("/me", requireAuth(), async (req, res) => {
	try {
		const [rows] = await dbPool.query(
			"SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?",
			[req.user.id]
		);
		res.json(rows[0]);
	} catch {
		res.status(500).json({ message: "Failed to fetch profile" });
	}
});

router.put("/me", requireAuth(), async (req, res) => {
	const { error, value } = profileSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	try {
		await dbPool.query("UPDATE users SET name=?, phone=? WHERE id=?", [
			value.name,
			value.phone || null,
			req.user.id
		]);
		res.json({ success: true });
	} catch {
		res.status(500).json({ message: "Failed to update profile" });
	}
});

export default router;


