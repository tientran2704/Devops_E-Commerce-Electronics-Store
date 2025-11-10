import { Router } from "express";
import Joi from "joi";
import { dbPool } from "../lib/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const reviewSchema = Joi.object({
	product_id: Joi.number().integer().required(),
	rating: Joi.number().integer().min(1).max(5).required(),
	comment: Joi.string().allow("", null)
});

router.get("/:productId", async (req, res) => {
	const productId = Number(req.params.productId);
	try {
		const [rows] = await dbPool.query(
			`SELECT r.id, r.rating, r.comment, r.created_at, u.name as user_name
       FROM product_reviews r JOIN users u ON u.id = r.user_id
       WHERE r.product_id = ? ORDER BY r.id DESC`,
			[productId]
		);
		res.json({ data: rows });
	} catch {
		res.status(500).json({ message: "Failed to fetch reviews" });
	}
});

router.post("/", requireAuth(), async (req, res) => {
	const { error, value } = reviewSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	try {
		const [exists] = await dbPool.query("SELECT id FROM products WHERE id=?", [
			value.product_id
		]);
		if (exists.length === 0) return res.status(404).json({ message: "Product not found" });
		const [result] = await dbPool.query(
			"INSERT INTO product_reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
			[value.product_id, req.user.id, value.rating, value.comment || null]
		);
		res.status(201).json({ id: result.insertId, ...value });
	} catch {
		res.status(500).json({ message: "Create review failed" });
	}
});

export default router;


