import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
	return (
		<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
			<Header />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:id" element={<ProductDetail />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
					<Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}


