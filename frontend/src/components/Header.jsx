import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const quickLinks = [
	{ label: "Khuyến mãi", to: "/products" },
	{ label: "Hướng dẫn mua hàng", to: "/login" },
	{ label: "Liên hệ", to: "/account" },
];

const navLinks = [
	{ label: "Trang chủ", to: "/" },
	{ label: "Sản phẩm", to: "/products" },
	{ label: "Giỏ hàng", to: "/cart" },
	{ label: "Admin", to: "/admin", roles: ["admin"] },
];

const categories = [
	"Arduino & Kit học tập",
	"Cảm biến & Module",
	"Raspberry Pi & SBC",
	"AI & IoT",
	"Robot & DIY",
	"Động cơ & Driver",
	"Thiết bị đo lường",
	"Phụ kiện & Linh kiện",
];

export default function Header() {
	const { isAuthenticated, user, logout, status } = useAuth();
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.startsWith("/products")) {
			const params = new URLSearchParams(location.search);
			setKeyword(params.get("q") || "");
		} else {
			setKeyword("");
		}
	}, [location.pathname, location.search]);

	const handleSearch = (event) => {
		event.preventDefault();
		const baseParams = location.pathname.startsWith("/products") ? new URLSearchParams(location.search) : new URLSearchParams();
		if (keyword.trim()) {
			baseParams.set("q", keyword.trim());
		} else {
			baseParams.delete("q");
		}
		baseParams.delete("page");
		const queryString = baseParams.toString();
		navigate(`/products${queryString ? `?${queryString}` : ""}`);
	};

	const allowedNavLinks = navLinks.filter((link) => {
		if (!link.roles || link.roles.length === 0) return true;
		return user && link.roles.includes(user.role);
	});

	const userInitial = (user?.name || user?.email || "?").slice(0, 2).toUpperCase();
	const isLoading = status === "loading";

	return (
		<header className="bg-white shadow-sm">
			<div className="bg-blue-900 text-white text-xs md:text-sm">
				<div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
					<span className="font-semibold">Hshop.vn - Điện tử &amp; Robot</span>
					<div className="flex flex-wrap items-center gap-4 text-blue-100">
						<span>Hotline: 028.6670.4455</span>
						<span>Email: contact.hshopvn@gmail.com</span>
					</div>
					<nav className="flex flex-wrap gap-4">
						{quickLinks.map((item) => (
							<Link key={item.to} to={item.to} className="hover:text-white">
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-6">
				<Link to="/" className="text-2xl font-black tracking-tight text-blue-900">
					HSHOP.vn
				</Link>
				<form className="flex-1 min-w-[240px]" onSubmit={handleSearch}>
					<label className="relative block">
						<span className="sr-only">Tìm kiếm</span>
						<input
							type="search"
							placeholder="Tìm kiếm sản phẩm, thương hiệu, linh kiện..."
							className="w-full rounded-full border border-blue-200 bg-blue-50 py-3 pl-5 pr-24 text-sm placeholder-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
							value={keyword}
							onChange={(event) => setKeyword(event.target.value)}
							disabled={isLoading}
						/>
						<button
							type="submit"
							className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
							disabled={isLoading}
						>
							Tìm
						</button>
					</label>
				</form>
				<div className="flex items-center gap-4 text-sm font-medium text-slate-700">
					{isAuthenticated ? (
						<>
							<Link to="/account" className="flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50/60 px-4 py-2 hover:border-blue-300 hover:bg-blue-50">
								<span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
									{userInitial}
								</span>
								<span className="flex flex-col text-left">
									<span className="text-xs text-blue-500">Tài khoản</span>
									<span className="text-sm font-semibold text-blue-800 line-clamp-1">{user?.name || user?.email}</span>
								</span>
							</Link>
							<button
								type="button"
								onClick={logout}
								className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-red-200 hover:text-red-600"
								disabled={isLoading}
							>
								Đăng xuất
							</button>
							<Link to="/cart" className="flex flex-col items-center gap-1 hover:text-blue-600">
								<span className="rounded-full border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700">Giỏ</span>
								<span>Giỏ hàng</span>
							</Link>
						</>
					) : (
						<>
							<Link to="/login" className="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
								Đăng nhập
							</Link>
							<Link to="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700">
								Đăng ký
							</Link>
							<Link to="/cart" className="flex flex-col items-center gap-1 hover:text-blue-600">
								<span className="rounded-full border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700">Giỏ</span>
								<span>Giỏ hàng</span>
							</Link>
						</>
					)}
				</div>
			</div>
			<div className="border-t bg-gray-50">
				<div className="max-w-7xl mx-auto px-4">
					<nav className="flex gap-6 overflow-x-auto py-3 text-sm font-medium text-slate-700">
						{allowedNavLinks.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									`whitespace-nowrap transition-colors hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
								}
							>
								{item.label}
							</NavLink>
						))}
						<div className="ml-auto hidden lg:flex gap-6 text-xs uppercase tracking-wide text-slate-500">
							{categories.map((category) => (
								<span key={category} className="whitespace-nowrap hover:text-blue-600 cursor-pointer">
									{category}
								</span>
							))}
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}


