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

// CORS configuration - allow frontend origins
const allowedOrigins = process.env.FRONTEND_URL 
	? process.env.FRONTEND_URL.split(',').map(url => url.trim())
	: [];

app.use(cors({
	origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps or curl requests)
		if (!origin) return callback(null, true);
		
		// Allow localhost for development
		if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
			return callback(null, true);
		}
		
		// Allow all Render.com domains (https://*.onrender.com)
		if (origin.match(/^https:\/\/[a-zA-Z0-9-]+\.onrender\.com$/)) {
			return callback(null, true);
		}
		
		// Check if origin is in explicitly allowed list
		if (allowedOrigins.length > 0 && allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		
		// In development mode, allow all origins
		if (process.env.NODE_ENV !== 'production') {
			return callback(null, true);
		}
		
		// Reject in production if not matched
		callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	exposedHeaders: ['Authorization']
}));

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


