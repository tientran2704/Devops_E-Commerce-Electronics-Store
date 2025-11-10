import { Router } from "express";
import { dbPool } from "../lib/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth(), async (req, res) => {
	const conn = await dbPool.getConnection();
	try {
		await conn.beginTransaction();
		const [cartItems] = await conn.query(
			`SELECT c.product_id, c.quantity, p.price, p.stock
       FROM carts c JOIN products p ON p.id = c.product_id
       WHERE c.user_id = ? FOR UPDATE`,
			[req.user.id]
		);
		if (cartItems.length === 0) {
			await conn.rollback();
			return res.status(400).json({ message: "Cart is empty" });
		}
		// stock check
		for (const item of cartItems) {
			if (item.quantity > item.stock) {
				await conn.rollback();
				return res.status(400).json({ message: "Insufficient stock for some items" });
			}
		}
		const total = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
		const [orderRes] = await conn.query(
			"INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')",
			[req.user.id, total]
		);
		const orderId = orderRes.insertId;
		for (const item of cartItems) {
			await conn.query(
				"INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
				[orderId, item.product_id, item.quantity, item.price]
			);
			await conn.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
				item.quantity,
				item.product_id
			]);
		}
		await conn.query("DELETE FROM carts WHERE user_id = ?", [req.user.id]);
		await conn.commit();
		res.status(201).json({ id: orderId, total_price: total, status: "pending" });
	} catch (e) {
		await dbPool.query("ROLLBACK");
		res.status(500).json({ message: "Create order failed" });
	} finally {
		conn.release();
	}
});

router.get("/", requireAuth(), async (req, res) => {
	try {
		const [rows] = await dbPool.query(
			"SELECT id, total_price, status, created_at FROM orders WHERE user_id=? ORDER BY id DESC",
			[req.user.id]
		);
		res.json({ data: rows });
	} catch {
		res.status(500).json({ message: "Failed to fetch orders" });
	}
});

router.get("/:id", requireAuth(), async (req, res) => {
	const id = Number(req.params.id);
	try {
		const [orders] = await dbPool.query(
			"SELECT * FROM orders WHERE id=? AND user_id=?",
			[id, req.user.id]
		);
		if (orders.length === 0) return res.status(404).json({ message: "Not found" });
		const [items] = await dbPool.query(
			`SELECT oi.product_id, p.name, oi.quantity, oi.price
       FROM order_items oi JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id=?`,
			[id]
		);
		res.json({ ...orders[0], items });
	} catch {
		res.status(500).json({ message: "Failed to fetch order" });
	}
});

export default router;


