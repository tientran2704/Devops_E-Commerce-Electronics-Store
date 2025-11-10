import { Router } from "express";
import Joi from "joi";
import { dbPool } from "../lib/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const categorySchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	description: Joi.string().allow("").optional(),
	image: Joi.string().uri().allow("", null)
});

router.get("/", async (req, res) => {
	try {
		const [rows] = await dbPool.query("SELECT * FROM categories ORDER BY name ASC");
		res.json({ data: rows });
	} catch {
		res.status(500).json({ message: "Failed to fetch categories" });
	}
});

router.post("/", requireAuth(["admin"]), async (req, res) => {
	const { error, value } = categorySchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	try {
		const [result] = await dbPool.query(
			"INSERT INTO categories (name, description, image) VALUES (?, ?, ?)",
			[value.name, value.description || "", value.image || null]
		);
		res.status(201).json({ id: result.insertId, ...value });
	} catch {
		res.status(500).json({ message: "Create category failed" });
	}
});

router.put("/:id", requireAuth(["admin"]), async (req, res) => {
	const { error, value } = categorySchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const id = Number(req.params.id);
	try {
		const [result] = await dbPool.query(
			"UPDATE categories SET name=?, description=?, image=? WHERE id=?",
			[value.name, value.description || "", value.image || null, id]
		);
		if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
		res.json({ id, ...value });
	} catch {
		res.status(500).json({ message: "Update category failed" });
	}
});

router.delete("/:id", requireAuth(["admin"]), async (req, res) => {
	const id = Number(req.params.id);
	try {
		const [result] = await dbPool.query("DELETE FROM categories WHERE id = ?", [id]);
		if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
		res.json({ success: true });
	} catch {
		res.status(500).json({ message: "Delete category failed" });
	}
});

export default router;


