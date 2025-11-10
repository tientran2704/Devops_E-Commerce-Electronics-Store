import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { login, status, isAuthenticated } = useAuth();
	const redirectTo = location.state?.from?.pathname || "/";

	useEffect(() => {
		if (isAuthenticated) {
			navigate(redirectTo, { replace: true });
		}
	}, [isAuthenticated, navigate, redirectTo]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);
		try {
			const result = await login({ email, password });
			if (result.success) {
				navigate(redirectTo, { replace: true });
			} else {
				setError(result.message || "Đăng nhập thất bại");
			}
		} catch {
			setError("Đăng nhập thất bại");
		}
		setIsSubmitting(false);
	};
	const submitting = isSubmitting || status === "loading";
	return (
		<section className="max-w-7xl mx-auto px-4 py-16">
			<div className="grid items-center gap-12 lg:grid-cols-2">
				<div className="space-y-6">
					<span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
						HSHOP CARE
					</span>
					<h1 className="text-4xl font-black text-blue-900">Chào mừng bạn trở lại Hshop.vn</h1>
					<p className="text-sm text-slate-600">
						Đăng nhập để quản lý đơn hàng, xem lịch sử mua sắm, nhận ưu đãi thành viên và được hỗ trợ kỹ thuật nhanh chóng.
					</p>
					<div className="grid gap-4 text-sm text-slate-600">
						<div className="flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">1</span>
							<div>
								<div className="font-semibold text-slate-900">Kiểm tra trạng thái đơn hàng</div>
								<div>Thông tin giao hàng, mã vận đơn cập nhật theo thời gian thực.</div>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">2</span>
							<div>
								<div className="font-semibold text-slate-900">Lưu danh sách sản phẩm yêu thích</div>
								<div>Đồng bộ giữa web và cửa hàng, hỗ trợ tư vấn nhanh chóng.</div>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
					<h2 className="text-2xl font-bold text-blue-900">Đăng nhập tài khoản</h2>
					<p className="mt-2 text-sm text-slate-600">Sử dụng email đã đăng ký để truy cập vào trải nghiệm mua sắm của bạn.</p>
					<form className="mt-8 space-y-6" onSubmit={onSubmit}>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700">Email</label>
							<input
								className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={submitting}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
							<input
								className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
								placeholder="••••••••"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={submitting}
							/>
						</div>
						{error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
						<button
							className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
							disabled={submitting}
						>
							{submitting ? "Đang đăng nhập..." : "Đăng nhập"}
						</button>
					</form>
					<div className="mt-6 text-center text-sm text-slate-500">
						Chưa có tài khoản?{" "}
						<button
							type="button"
							onClick={() => navigate("/register")}
							className="font-semibold text-blue-600 hover:text-blue-700"
						>
							Đăng ký ngay
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}


