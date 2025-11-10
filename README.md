## Electronics Store - Fullstack (React, Express, MySQL, Docker)

### Quick start (Docker)
1. Copy example env:
   - Create `backend/.env` with:
     - `PORT=8080`
     - `JWT_SECRET=your_jwt_secret_here`
     - `DB_HOST=db`
     - `DB_PORT=3306`
     - `DB_USER=ecomuser`
     - `DB_PASSWORD=ecompass`
     - `DB_NAME=ecommerce`
2. Build & run:
```bash
docker compose up -d --build
```
3. Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080/api/health
4. MySQL credentials (default in compose):
- host: localhost
- port: 3306
- user: ecomuser
- pass: ecompass
- db: ecommerce

### Features (Phase 1, scaffold)
- React + Vite + Tailwind frontend with routing
- Express backend with JWT auth, rate-limiting, security headers
- MySQL schema and init
- Dockerfiles and docker-compose

### Core APIs (now available)
- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Products: 
  - `GET /api/products?q=phone&page=1&limit=12&category_id=...`
  - `GET /api/products/:id`
  - Admin: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- Categories:
  - `GET /api/categories`
  - Admin: `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- Users:
  - `GET /api/users/me`, `PUT /api/users/me` (JWT)
- Cart (JWT):
  - `GET /api/cart`
  - `POST /api/cart` { product_id, quantity }
  - `PUT /api/cart/:productId` { quantity }
  - `DELETE /api/cart/:productId`
- Orders (JWT):
  - `POST /api/orders` (create from cart, stock deduction)
  - `GET /api/orders`, `GET /api/orders/:id`
- Reviews:
  - `GET /api/reviews/:productId`
  - `POST /api/reviews` { product_id, rating, comment } (JWT)

### Frontend wiring
- Login/Register stores JWT in `localStorage`, attached via Authorization header
- Products list and detail fetch from backend
- Add-to-cart from product detail, Cart page supports +/-/remove
- Checkout creates order (simple COD stub)

### Next
- Implement full product/category/user CRUD
- Cart, orders, payments (Stripe/PayPal)
- Email confirmation, forgot password
- Admin dashboards and reporting


