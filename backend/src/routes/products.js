import { Router } from "express";
import Joi from "joi";
import { dbPool } from "../lib/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const productSchema = Joi.object({
	name: Joi.string().min(2).max(200).required(),
	description: Joi.string().allow("").optional(),
	price: Joi.number().positive().required(),
	stock: Joi.number().integer().min(0).required(),
	category_id: Joi.number().integer().allow(null),
	image_url: Joi.string().uri().allow("", null)
});

router.get("/", async (req, res) => {
	const { q = "", page = 1, limit = 12, category_id } = req.query;
	const pageNum = Math.max(1, Number(page));
	const pageSize = Math.min(50, Math.max(1, Number(limit)));
	const offset = (pageNum - 1) * pageSize;

	const params = [];
	let where = "WHERE 1=1";
	if (q) {
		where += " AND (name LIKE ? OR MATCH(name, description) AGAINST (? IN NATURAL LANGUAGE MODE))";
		params.push(`%${q}%`, q);
	}
	if (category_id) {
		where += " AND category_id = ?";
		params.push(Number(category_id));
	}

	try {
		const [rows] = await dbPool.query(
			`SELECT SQL_CALC_FOUND_ROWS id, name, description, price, stock, image_url
       FROM products
       ${where}
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
			[...params, pageSize, offset]
		);
		const [countRows] = await dbPool.query("SELECT FOUND_ROWS() as total");
		res.json({
			data: rows,
			pagination: { page: pageNum, limit: pageSize, total: countRows[0].total }
		});
	} catch {
		res.status(500).json({ message: "Failed to fetch products" });
	}
});

router.get("/:id", async (req, res) => {
	const id = Number(req.params.id);
	try {
		const [rows] = await dbPool.query("SELECT * FROM products WHERE id = ?", [id]);
		if (rows.length === 0) return res.status(404).json({ message: "Not found" });
		res.json(rows[0]);
	} catch {
		res.status(500).json({ message: "Failed to fetch product" });
	}
});

router.post("/", requireAuth(["admin"]), async (req, res) => {
	const { error, value } = productSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	try {
		const { name, description, price, stock, category_id, image_url } = value;
		const [result] = await dbPool.query(
			"INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)",
			[name, description || "", price, stock, category_id || null, image_url || null]
		);
		res.status(201).json({ id: result.insertId, ...value });
	} catch {
		res.status(500).json({ message: "Create product failed" });
	}
});

router.put("/:id", requireAuth(["admin"]), async (req, res) => {
	const { error, value } = productSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const id = Number(req.params.id);
	try {
		const [result] = await dbPool.query(
			"UPDATE products SET name=?, description=?, price=?, stock=?, category_id=?, image_url=? WHERE id=?",
			[
				value.name,
				value.description || "",
				value.price,
				value.stock,
				value.category_id || null,
				value.image_url || null,
				id
			]
		);
		if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
		res.json({ id, ...value });
	} catch {
		res.status(500).json({ message: "Update product failed" });
	}
});

router.delete("/:id", requireAuth(["admin"]), async (req, res) => {
	const id = Number(req.params.id);
	try {
		const [result] = await dbPool.query("DELETE FROM products WHERE id = ?", [id]);
		if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
		res.json({ success: true });
	} catch {
		res.status(500).json({ message: "Delete product failed" });
	}
});

export default router;


