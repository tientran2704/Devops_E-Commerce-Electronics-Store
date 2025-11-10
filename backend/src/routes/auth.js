import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { dbPool } from "../lib/db.js";

const router = Router();

const registerSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

router.post("/register", async (req, res) => {
	const { error, value } = registerSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details?.[0]?.message || error.message;
		if (errorMessage.includes("email")) {
			return res.status(400).json({ message: "Email không hợp lệ" });
		}
		if (errorMessage.includes("password")) {
			return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
		}
		if (errorMessage.includes("name")) {
			return res.status(400).json({ message: "Họ tên phải có ít nhất 2 ký tự" });
		}
		return res.status(400).json({ message: errorMessage });
	}
	const { name, email, password } = value;
	try {
		const [exists] = await dbPool.query("SELECT id FROM users WHERE email = ?", [
			email
		]);
		if (exists.length > 0) {
			return res.status(409).json({ message: "Email đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác." });
		}
		const hash = await bcrypt.hash(password, 10);
		const [result] = await dbPool.query(
			"INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
			[name, email, hash]
		);
		return res.status(201).json({ id: result.insertId, name, email });
	} catch (e) {
		console.error("Registration error:", e);
		// Kiểm tra lỗi database
		if (e.code === "ER_ACCESS_DENIED_ERROR" || e.code === "ECONNREFUSED") {
			return res.status(500).json({ message: "Không thể kết nối đến cơ sở dữ liệu. Vui lòng thử lại sau." });
		}
		if (e.code === "ER_DUP_ENTRY") {
			return res.status(409).json({ message: "Email đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác." });
		}
		return res.status(500).json({ message: `Đăng ký thất bại: ${e.message || "Lỗi không xác định"}` });
	}
});

router.post("/login", async (req, res) => {
	const { error, value } = loginSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { email, password } = value;
	try {
		const [rows] = await dbPool.query(
			"SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
			[email]
		);
		if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });
		const user = rows[0];
		const ok = await bcrypt.compare(password, user.password_hash);
		if (!ok) return res.status(401).json({ message: "Invalid credentials" });
		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET || "change_me",
			{ expiresIn: "7d" }
		);
		return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
	} catch {
		return res.status(500).json({ message: "Login failed" });
	}
});

export default router;


