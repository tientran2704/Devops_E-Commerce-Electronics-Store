import { Link } from "react-router-dom";

const supportLinks = [
	{ label: "Chính sách vận chuyển", to: "#" },
	{ label: "Chính sách bảo hành", to: "#" },
	{ label: "Chính sách đổi trả", to: "#" },
	{ label: "Chính sách bảo mật", to: "#" },
];

const customerLinks = [
	{ label: "Hướng dẫn mua hàng", to: "#" },
	{ label: "Thông tin liên hệ", to: "#" },
	{ label: "Sản phẩm yêu thích", to: "#" },
	{ label: "So sánh sản phẩm", to: "#" },
];

const accountLinks = [
	{ label: "Đăng ký tài khoản", to: "/register" },
	{ label: "Đăng nhập tài khoản", to: "/login" },
	{ label: "Giỏ hàng của bạn", to: "/cart" },
];

export default function Footer() {
	return (
		<footer className="bg-slate-900 text-slate-200">
			<div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
				<div>
					<h2 className="text-2xl font-black tracking-tight text-white">HSHOP.vn</h2>
					<p className="mt-4 text-sm text-slate-400">
						Điện tử &amp; Robot - cung cấp kit học tập, IoT, AI, cảm biến, linh kiện và giải pháp cho Makers &amp; Doanh nghiệp.
					</p>
					<div className="mt-4 text-sm">
						<p>Địa chỉ: 269/20 Lý Thường Kiệt, Phường Phú Thọ, TP.HCM</p>
						<p>Hotline: 028.6670.4455</p>
						<p>Email: contact.hshopvn@gmail.com</p>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white">Chính sách</h3>
					<ul className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
						{supportLinks.map((item) => (
							<li key={item.label}>
								<Link to={item.to} className="hover:text-white">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white">Hỗ trợ</h3>
					<ul className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
						{customerLinks.map((item) => (
							<li key={item.label}>
								<Link to={item.to} className="hover:text-white">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white">Tài khoản</h3>
					<ul className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
						{accountLinks.map((item) => (
							<li key={item.label}>
								<Link to={item.to} className="hover:text-white">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="mt-6 text-sm text-slate-400">
						<p>Giờ làm việc: Thứ 2 - Thứ 7, 8h00 - 18h30 (Chủ Nhật nghỉ)</p>
						<p>Zalo hỗ trợ: 0938.022.500 - 0934.022.500</p>
					</div>
				</div>
			</div>
			<div className="border-t border-slate-800">
				<div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-slate-500">
					© {new Date().getFullYear()} Hshop.vn - Nội dung được xây dựng bởi Hshop.vn, vui lòng ghi rõ nguồn khi sử dụng.
				</div>
			</div>
		</footer>
	);
}


