import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { Link } from "react-router-dom";

export default function Cart() {
	const [items, setItems] = useState([]);
	const load = async () => {
		try {
			const { data } = await api.get("/api/cart");
			setItems(data.items || []);
		} catch {
			setItems([]);
		}
	};
	useEffect(() => { load(); }, []);
	const updateQty = async (productId, quantity) => {
		await api.put(`/api/cart/${productId}`, { quantity });
		load();
	};
	const removeItem = async (productId) => {
		await api.delete(`/api/cart/${productId}`);
		load();
	};
	const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
	return (
		<section className="max-w-7xl mx-auto px-4 py-16">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<div className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Giỏ hàng</div>
					<h1 className="mt-2 text-3xl font-bold text-blue-900">Sản phẩm bạn đã chọn</h1>
					<p className="text-sm text-slate-600">
						Kiểm tra lại thông tin sản phẩm, số lượng và ưu đãi trước khi tiến hành thanh toán.
					</p>
				</div>
				<Link to="/products" className="rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
					Tiếp tục mua hàng
				</Link>
			</div>
			<div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
				<div className="space-y-4">
					{items.length === 0 && (
						<div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/50 p-10 text-center text-sm text-blue-700">
							Giỏ hàng của bạn đang trống. Khám phá sản phẩm mới tại Hshop.vn để bắt đầu dự án tiếp theo!
						</div>
					)}
					{items.map((it) => (
						<div
							key={it.product_id}
							className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
						>
							<img
								src={it.image_url || "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=300&q=80"}
								className="h-24 w-24 rounded-2xl object-cover"
							/>
							<div className="flex-1 space-y-2">
								<div className="text-sm font-semibold uppercase tracking-wide text-blue-600">#HSHOP</div>
								<div className="text-base font-semibold text-slate-900">{it.name}</div>
								<div className="text-sm text-slate-500">
									{Number(it.price).toLocaleString("vi-VN")}₫ x {it.quantity}
								</div>
								<div className="text-xs text-slate-400">Kho HCM • Giao nhanh trong ngày</div>
							</div>
							<div className="flex items-center gap-3">
								<button
									onClick={() => updateQty(it.product_id, Math.max(1, it.quantity - 1))}
									className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700"
									type="button"
								>
									-
								</button>
								<div className="min-w-[2rem] text-center text-sm font-semibold text-slate-700">{it.quantity}</div>
								<button
									onClick={() => updateQty(it.product_id, it.quantity + 1)}
									className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700"
									type="button"
								>
									+
								</button>
								<button onClick={() => removeItem(it.product_id)} className="text-sm font-semibold text-red-500 hover:text-red-600" type="button">
									Xóa
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="space-y-4">
					<div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100">
						<h2 className="text-lg font-semibold text-blue-900">Tạm tính</h2>
						<div className="mt-4 space-y-3 text-sm">
							<div className="flex justify-between text-slate-600">
								<span>Tổng sản phẩm</span>
								<span>{items.length}</span>
							</div>
							<div className="flex justify-between text-slate-600">
								<span>Phí vận chuyển</span>
								<span className="text-emerald-600 font-semibold">Miễn phí (đơn từ 2 triệu)</span>
							</div>
						</div>
						<div className="mt-6 flex items-center justify-between">
							<span className="text-sm font-semibold text-slate-500">Thành tiền</span>
							<span className="text-2xl font-black text-blue-900">{total.toLocaleString("vi-VN")}₫</span>
						</div>
						<Link
							to="/checkout"
							className="mt-6 block rounded-full bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
						>
							Tiến hành thanh toán
						</Link>
					</div>
					<div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
						<h3 className="text-base font-semibold text-blue-700">Ưu đãi dành cho bạn</h3>
						<ul className="mt-3 space-y-2">
							<li>• Tặng kèm file hướng dẫn kết nối phần cứng.</li>
							<li>• Giảm 5% cho module cảm biến khi mua kèm.</li>
							<li>• Hỗ trợ kỹ thuật qua Zalo trong suốt vòng đời dự án.</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}


