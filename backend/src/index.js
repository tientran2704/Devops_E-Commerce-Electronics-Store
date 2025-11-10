import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { dbPool } from "./lib/db.js";
import authRouter from "./routes/auth.js";
import healthRouter from "./routes/health.js";
import productsRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";
import usersRouter from "./routes/users.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/orders.js";
import reviewsRouter from "./routes/reviews.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Security & middleware
app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 300
	})
);

// Routes
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Backend running on port ${port}`);
});


