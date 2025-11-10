import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../lib/api.js";

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [msg, setMsg] = useState("");
	useEffect(() => {
		const base = import.meta.env.VITE_API_BASE || "http://localhost:8080";
		// Lấy sản phẩm theo ID trực tiếp
		axios.get(`${base}/api/products/${id}`).then((res) => {
			setProduct(res.data || null);
		}).catch(() => {
			// Fallback: tìm trong danh sách nếu endpoint /:id không hoạt động
			axios.get(`${base}/api/products?limit=1000`).then((res) => {
				const p = (res.data.data || []).find(x => String(x.id) === String(id));
				setProduct(p || null);
			}).catch(() => setProduct(null));
		});
	}, [id]);
	if (!product) {
		return (
			<section className="max-w-5xl mx-auto px-4 py-16">
				<div className="rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-slate-100">
					<div className="text-sm font-semibold uppercase tracking-wide text-blue-600">Đang tải</div>
					<h1 className="mt-4 text-2xl font-bold text-blue-900">Đang tải thông tin sản phẩm...</h1>
					<p className="mt-2 text-sm text-slate-600">Vui lòng đợi trong giây lát, Hshop.vn đang lấy dữ liệu cho bạn.</p>
				</div>
			</section>
		);
	}
	const addToCart = async () => {
		setMsg("");
		try {
			await api.post("/api/cart", { product_id: Number(id), quantity: 1 });
			setMsg("Đã thêm vào giỏ hàng");
		} catch {
			setMsg("Thêm vào giỏ thất bại. Hãy đăng nhập.");
		}
	};
	const price = product.price ? `${Number(product.price).toLocaleString("vi-VN")}₫` : "Liên hệ";
	const stockLabel = product.stock > 0 ? "Còn hàng" : "Hết hàng";
	return (
		<section className="bg-white">
			<div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
				<div className="max-w-6xl mx-auto px-4 py-12 text-white">
					<div className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">Sản phẩm</div>
					<h1 className="mt-4 text-4xl font-black leading-tight">{product.name}</h1>
					<p className="mt-3 max-w-2xl text-sm text-blue-100">
						Hàng chính hãng, kiểm tra kỹ trước khi giao. Hỗ trợ tư vấn tích hợp với dự án IoT, Robot, AI theo yêu cầu.
					</p>
				</div>
			</div>
			<div className="max-w-6xl mx-auto px-4 py-12">
				<div className="grid gap-10 lg:grid-cols-5">
					<div className="lg:col-span-3">
						<div className="overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
							<img
								src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"}
								alt={product.name}
								className="w-full object-cover"
							/>
						</div>
						{product.description && (
							<div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
								<h2 className="text-lg font-semibold text-slate-900">Mô tả sản phẩm</h2>
								<p className="mt-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line">
									{product.description}
								</p>
							</div>
						)}
						<div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">Thông tin kỹ thuật</h2>
							<ul className="mt-4 space-y-3 text-sm text-slate-600">
								<li>• Mã sản phẩm: #{product.id}</li>
								<li>• Trạng thái kho: {stockLabel} - cập nhật mỗi 15 phút</li>
								<li>• Chính sách bảo hành: 1 đổi 1 trong 7 ngày, bảo hành 6-12 tháng tùy thương hiệu</li>
								<li>• Hỗ trợ kỹ thuật: Zalo 0968.022.500, Facebook Messenger Hshop.vn</li>
							</ul>
						</div>
					</div>
					<div className="lg:col-span-2 space-y-6">
						<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
							<div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Giá bán</div>
							<div className="mt-3 text-3xl font-black text-blue-900">{price}</div>
							<div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
								<span className="h-2 w-2 rounded-full bg-emerald-500" />
								<span>{stockLabel} tại kho HCM</span>
							</div>
							<button
								onClick={addToCart}
								className="mt-6 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
							>
								Thêm vào giỏ hàng
							</button>
							{msg && (
								<div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
									{msg}
								</div>
							)}
						</div>
						<div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
							<h3 className="text-base font-semibold text-slate-900">Dịch vụ đi kèm</h3>
							<ul className="mt-3 space-y-2">
								<li>• Hỗ trợ nạp firmware, setup demo theo nhu cầu.</li>
								<li>• Giảm 5% khi mua kèm module, cảm biến liên quan.</li>
								<li>• Hóa đơn VAT xuất trong 24h kể từ khi đặt hàng.</li>
							</ul>
						</div>
						<div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
							<h3 className="text-base font-semibold text-blue-700">Chính sách vận chuyển</h3>
							<ul className="mt-3 space-y-2 text-blue-800">
								<li>• Giao hàng nội thành HCM trong 2-4 giờ.</li>
								<li>• Toàn quốc từ 24-48 giờ, hỗ trợ đóng gói chống sốc.</li>
								<li>• Miễn phí khi đơn hàng từ 2 triệu trở lên.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


