import { useState } from "react";
import { api } from "../lib/api.js";

export default function Checkout() {
	const [msg, setMsg] = useState("");
	const createOrder = async () => {
		setMsg("");
		try {
			const { data } = await api.post("/api/orders", {});
			setMsg(`Tạo đơn hàng thành công #${data.id}, trạng thái ${data.status}`);
		} catch {
			setMsg("Tạo đơn hàng thất bại. Kiểm tra giỏ hàng và đăng nhập.");
		}
	};
	return (
		<section className="max-w-7xl mx-auto px-4 py-16">
			<div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
				<div className="space-y-8">
					<div>
						<div className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Thanh toán</div>
						<h1 className="mt-3 text-3xl font-bold text-blue-900">Hoàn tất đơn hàng của bạn</h1>
						<p className="mt-2 text-sm text-slate-600">
							Vui lòng xác nhận thông tin giao hàng, phương thức thanh toán và ghi chú để Hshop.vn giao đúng hẹn.
						</p>
					</div>
					<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
						<h2 className="text-lg font-semibold text-blue-900">Thông tin khách hàng</h2>
						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Họ tên người nhận" />
							<input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Số điện thoại" />
							<input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:col-span-2" placeholder="Email nhận hóa đơn" />
							<input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:col-span-2" placeholder="Địa chỉ giao hàng chi tiết" />
						</div>
						<textarea className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" rows={3} placeholder="Ghi chú cho đơn hàng (ví dụ: xuất hóa đơn VAT, thời gian giao hàng mong muốn)" />
					</div>
					<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
						<h2 className="text-lg font-semibold text-blue-900">Phương thức thanh toán</h2>
						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold text-blue-800 shadow-sm">
								<input type="radio" name="payment" defaultChecked className="h-4 w-4 text-blue-600" />
								<span>Thanh toán khi nhận hàng (COD)</span>
								<p className="text-xs font-normal text-blue-700">Kiểm tra hàng trước khi thanh toán, phù hợp cho nội thành HCM &amp; toàn quốc.</p>
							</label>
							<label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700 shadow-sm">
								<input type="radio" name="payment" className="h-4 w-4 text-blue-600" />
								<span>Chuyển khoản ngân hàng</span>
								<p className="text-xs font-normal text-slate-600">Techcombank, Vietcombank, thông tin sẽ được gửi sau khi đặt hàng.</p>
							</label>
						</div>
					</div>
					<button
						onClick={createOrder}
						className="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 sm:w-auto sm:px-10"
						type="button"
					>
						Xác nhận đặt hàng (COD)
					</button>
					{msg && (
						<div className="rounded-3xl border border-blue-100 bg-blue-50 px-6 py-4 text-sm font-semibold text-blue-700">
							{msg}
						</div>
					)}
				</div>
				<div className="space-y-6">
					<div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100">
						<h3 className="text-lg font-semibold text-blue-900">Tóm tắt đơn hàng</h3>
						<ul className="mt-4 space-y-3 text-sm text-slate-600">
							<li className="flex justify-between">
								<span>Giá sản phẩm</span>
								<span>—</span>
							</li>
							<li className="flex justify-between">
								<span>Phí vận chuyển</span>
								<span>Miễn phí</span>
							</li>
							<li className="flex justify-between font-semibold text-blue-900">
								<span>Tổng thanh toán</span>
								<span>—</span>
							</li>
						</ul>
						<div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs text-blue-800">
							<span className="font-semibold">Lưu ý:</span> Sau khi đặt hàng thành công, đội ngũ Hshop.vn sẽ liên hệ xác nhận trong vòng 15 phút giờ hành chính.
						</div>
					</div>
					<div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
						<h3 className="text-base font-semibold text-slate-900">Trung tâm hỗ trợ khách hàng</h3>
						<ul className="mt-3 space-y-2">
							<li>Hotline: 028.6670.4455</li>
							<li>Zalo bán hàng: 0938.022.500 - 0934.022.500</li>
							<li>Email: contact.hshopvn@gmail.com</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}


