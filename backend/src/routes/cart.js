import { Router } from "express";
import Joi from "joi";
import { dbPool } from "../lib/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const modifySchema = Joi.object({
	product_id: Joi.number().integer().required(),
	quantity: Joi.number().integer().min(1).required()
});

router.get("/", requireAuth(), async (req, res) => {
	try {
		const [rows] = await dbPool.query(
			`SELECT c.product_id, p.name, p.price, p.image_url, c.quantity
       FROM carts c JOIN products p ON p.id = c.product_id
       WHERE c.user_id = ?`,
			[req.user.id]
		);
		res.json({ items: rows });
	} catch {
		res.status(500).json({ message: "Failed to fetch cart" });
	}
});

router.post("/", requireAuth(), async (req, res) => {
	const { error, value } = modifySchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	try {
		const [stockRows] = await dbPool.query("SELECT stock FROM products WHERE id=?", [
			value.product_id
		]);
		if (stockRows.length === 0) return res.status(404).json({ message: "Product not found" });
		if (value.quantity > stockRows[0].stock)
			return res.status(400).json({ message: "Exceeds stock" });
		await dbPool.query(
			`INSERT INTO carts (user_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)`,
			[req.user.id, value.product_id, value.quantity]
		);
		res.status(201).json({ success: true });
	} catch {
		res.status(500).json({ message: "Failed to add to cart" });
	}
});

router.put("/:productId", requireAuth(), async (req, res) => {
	const { error, value } = modifySchema
		.fork(["product_id"], (s) => s.optional())
		.validate({ product_id: Number(req.params.productId), ...req.body });
	if (error) return res.status(400).json({ message: error.message });
	try {
		const [stockRows] = await dbPool.query("SELECT stock FROM products WHERE id=?", [
			Number(req.params.productId)
		]);
		if (stockRows.length === 0) return res.status(404).json({ message: "Product not found" });
		if (value.quantity > stockRows[0].stock)
			return res.status(400).json({ message: "Exceeds stock" });
		const [result] = await dbPool.query(
			"UPDATE carts SET quantity=? WHERE user_id=? AND product_id=?",
			[value.quantity, req.user.id, Number(req.params.productId)]
		);
		if (result.affectedRows === 0) return res.status(404).json({ message: "Not in cart" });
		res.json({ success: true });
	} catch {
		res.status(500).json({ message: "Failed to update cart item" });
	}
});

router.delete("/:productId", requireAuth(), async (req, res) => {
	try {
		await dbPool.query("DELETE FROM carts WHERE user_id=? AND product_id=?", [
			req.user.id,
			Number(req.params.productId)
		]);
		res.json({ success: true });
	} catch {
		res.status(500).json({ message: "Failed to remove from cart" });
	}
});

export default router;


