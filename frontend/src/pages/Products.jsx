import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Products() {
	const [products, setProducts] = useState([]);
	const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12 });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

	const base = import.meta.env.VITE_API_BASE || "http://localhost:8080";
	const query = searchParams.get("q") || "";
	const category = searchParams.get("category_id") || "all";
	const sort = searchParams.get("sort") || "popular";
	const page = Number(searchParams.get("page") || 1);
	const limit = Number(searchParams.get("limit") || 60); // Hiển thị 60 sản phẩm mặc định

	useEffect(() => {
		setSearchValue(query);
	}, [query]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchProducts = async () => {
			setLoading(true);
			setError("");
			try {
				const params = { page, limit };
				if (query) params.q = query;
				if (category !== "all") params.category_id = category;
				const { data } = await axios.get(`${base}/api/products`, {
					params,
					signal: controller.signal,
				});
				setProducts(data.data || []);
				setMeta(data.pagination || { total: 0, page, limit });
			} catch (err) {
				if (!axios.isCancel(err)) {
					setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
					setProducts([]);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
		return () => controller.abort();
	}, [base, query, category, page, limit]);

	const sortedProducts = useMemo(() => {
		const items = [...products];
		if (sort === "price_low") {
			return items.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
		}
		if (sort === "price_high") {
			return items.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
		}
		if (sort === "new") {
			return items.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
		}
		return items;
	}, [products, sort]);

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		const params = new URLSearchParams(searchParams);
		if (searchValue.trim()) {
			params.set("q", searchValue.trim());
		} else {
			params.delete("q");
		}
		params.delete("page");
		setSearchParams(params);
	};

	const handleCategoryChange = (event) => {
		const value = event.target.value;
		const params = new URLSearchParams(searchParams);
		if (value === "all") {
			params.delete("category_id");
		} else {
			params.set("category_id", value);
		}
		params.delete("page");
		setSearchParams(params);
	};

	const handleSortChange = (event) => {
		const value = event.target.value;
		const params = new URLSearchParams(searchParams);
		if (value === "popular") {
			params.delete("sort");
		} else {
			params.set("sort", value);
		}
		setSearchParams(params);
	};

	const changePage = (nextPage) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", String(nextPage));
		setSearchParams(params);
	};

	const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit || limit));

	return (
		<section className="max-w-7xl mx-auto px-4 py-12">
			<div className="rounded-3xl bg-white px-6 py-8 shadow-lg ring-1 ring-slate-100">
				<div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-6">
					<div>
						<h1 className="text-3xl font-bold text-blue-900">Kho sản phẩm điện tử</h1>
						<p className="mt-2 text-sm text-slate-600">
							Arduino, Raspberry Pi, cảm biến, module chức năng, robot &amp; phụ kiện chính hãng có sẵn tại kho.
						</p>
					</div>
					<form className="flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={handleSearchSubmit}>
						<div className="flex items-center gap-3">
							<select
								className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
								onChange={handleCategoryChange}
								value={category}
							>
								<option value="all">Tất cả danh mục</option>
								<option value="1">Arduino &amp; Kit</option>
								<option value="2">Cảm biến</option>
								<option value="3">Robot &amp; DIY</option>
								<option value="4">SBC &amp; Raspberry Pi</option>
							</select>
							<select
								className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
								onChange={handleSortChange}
								value={sort}
							>
								<option value="popular">Phổ biến</option>
								<option value="new">Mới nhất</option>
								<option value="price_low">Giá tăng dần</option>
								<option value="price_high">Giá giảm dần</option>
							</select>
						</div>
						<div className="flex gap-3">
							<input
								type="search"
								value={searchValue}
								onChange={(event) => setSearchValue(event.target.value)}
								placeholder="Tìm kiếm nhanh..."
								className="w-full rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm placeholder-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
							/>
							<button
								className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-60"
								disabled={loading}
							>
								Tìm
							</button>
						</div>
					</form>
				</div>
				<div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
					<div>
						{loading
							? "Đang tải sản phẩm..."
							: `Có ${meta.total || products.length} sản phẩm${query ? ` cho từ khóa "${query}"` : ""}.`}
					</div>
					{meta.total > meta.limit && (
						<div className="flex items-center gap-2">
							<span>Trang {meta.page}/{totalPages}</span>
						</div>
					)}
				</div>
				{error && (
					<div className="mt-6 rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
						{error}
					</div>
				)}
				<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{!loading && sortedProducts.length === 0 && !error && (
						<div className="col-span-full rounded-3xl border border-dashed border-blue-200 bg-blue-50/60 p-10 text-center text-sm text-blue-700">
							Không tìm thấy sản phẩm nào phù hợp. Vui lòng thử từ khóa khác.
						</div>
					)}
					{sortedProducts.map((p) => (
						<Link
							key={p.id}
							to={`/products/${p.id}`}
							className="group flex flex-col rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
						>
							<div className="relative overflow-hidden rounded-2xl bg-white">
								<img
									src={p.image_url || "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=600&q=80"}
									alt={p.name}
									className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
								/>
								<span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
									Sẵn hàng
								</span>
							</div>
							<div className="mt-4 flex-1 space-y-2">
								<div className="text-sm font-semibold text-blue-600">#HSHOP</div>
								<div className="text-base font-semibold text-slate-900 line-clamp-2">{p.name}</div>
								<div className="text-lg font-bold text-blue-700">
									{p.price ? `${Number(p.price).toLocaleString("vi-VN")}₫` : "Liên hệ"}
								</div>
							</div>
							<span className="mt-4 rounded-full border border-blue-200 bg-blue-50 py-2 text-center text-sm font-semibold text-blue-700">
								Xem chi tiết
							</span>
						</Link>
					))}
				</div>
				{totalPages > 1 && (
					<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
						<button
							type="button"
							onClick={() => changePage(Math.max(1, page - 1))}
							disabled={page <= 1 || loading}
							className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
						>
							Trang trước
						</button>
						<span className="text-sm font-semibold text-blue-700">
							Trang {page} / {totalPages}
						</span>
						<button
							type="button"
							onClick={() => changePage(Math.min(totalPages, page + 1))}
							disabled={page >= totalPages || loading}
							className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
						>
							Trang sau
						</button>
					</div>
				)}
			</div>
		</section>
	);
}

