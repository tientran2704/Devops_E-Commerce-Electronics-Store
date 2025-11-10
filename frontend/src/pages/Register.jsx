import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { register, status, isAuthenticated } = useAuth();
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
			const result = await register({ name, email, password });
			if (result.success) {
				navigate(redirectTo, { replace: true });
			} else {
				setError(result.message || "Đăng ký thất bại");
			}
		} catch {
			setError("Đăng ký thất bại");
		}
		setIsSubmitting(false);
	};
	const submitting = isSubmitting || status === "loading";
	return (
		<section className="max-w-7xl mx-auto px-4 py-16">
			<div className="grid items-center gap-12 lg:grid-cols-2">
				<div className="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
					<h1 className="text-3xl font-black text-blue-900">Tạo tài khoản thành viên Hshop.vn</h1>
					<p className="mt-2 text-sm text-slate-600">
						Trở thành thành viên để nhận ưu đãi đặc biệt, cập nhật sản phẩm mới và hỗ trợ kỹ thuật 1-1 cho dự án của bạn.
					</p>
					<form className="mt-8 space-y-6" onSubmit={onSubmit}>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700">Họ tên</label>
							<input
								className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
								placeholder="Nguyễn Văn A"
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled={submitting}
							/>
						</div>
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
								placeholder="Tối thiểu 8 ký tự"
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
							{submitting ? "Đang xử lý..." : "Tạo tài khoản"}
						</button>
					</form>
					<div className="mt-6 text-center text-sm text-slate-500">
						Đã là thành viên?{" "}
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="font-semibold text-blue-600 hover:text-blue-700"
						>
							Đăng nhập
						</button>
					</div>
				</div>
				<div className="space-y-6">
					<div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 p-8 text-white shadow-xl">
						<h2 className="text-xl font-semibold">Quyền lợi thành viên</h2>
						<ul className="mt-4 space-y-3 text-sm text-blue-100">
							<li>• Thông báo hàng về mới, đúng mã linh kiện bạn quan tâm.</li>
							<li>• Ưu đãi độc quyền cho Maker, doanh nghiệp và trường học.</li>
							<li>• Hỗ trợ kỹ thuật qua Zalo, Facebook Messenger 24/7.</li>
						</ul>
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
							<div className="font-semibold text-blue-700">Giờ làm việc</div>
							<p className="mt-2">Thứ 2 - Thứ 7: 8h00 - 18h30</p>
							<p>Chủ Nhật: Nghỉ</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
							<div className="font-semibold text-slate-900">Liên hệ nhanh</div>
							<p className="mt-2">Zalo bán hàng: 0938.022.500 - 0934.022.500</p>
							<p>Zalo kỹ thuật: 0968.022.500</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


