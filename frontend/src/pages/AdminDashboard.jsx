const panels = [
	{
		title: "Sản phẩm",
		description: "Cập nhật tồn kho, giá bán và phân loại dựa trên danh mục.",
		action: "Quản lý sản phẩm",
	},
	{
		title: "Đơn hàng",
		description: "Theo dõi đơn mới, xác nhận thanh toán và xử lý giao hàng.",
		action: "Xem đơn hàng",
	},
	{
		title: "Khách hàng",
		description: "Quản lý tài khoản, phân quyền admin và chăm sóc khách hàng.",
		action: "Quản lý người dùng",
	},
];

const stats = [
	{ label: "Đơn hàng hôm nay", value: "24", change: "+12% so với hôm qua" },
	{ label: "Doanh thu tuần", value: "128.500.000₫", change: "+8% so với tuần trước" },
	{ label: "Sản phẩm sắp hết hàng", value: "6", change: "Cần nhập hàng trong 3 ngày tới" },
];

export default function AdminDashboard() {
	return (
		<section className="max-w-7xl mx-auto px-4 py-16">
			<div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-800 px-8 py-12 text-white shadow-xl">
				<h1 className="text-3xl font-black">Bảng điều khiển Hshop.vn</h1>
				<p className="mt-3 text-sm text-blue-100">
					Theo dõi hiệu suất bán hàng, quản lý sản phẩm và chăm sóc khách hàng theo thời gian thực.
				</p>
				<div className="mt-6 grid gap-4 md:grid-cols-3">
					{stats.map((stat) => (
						<div key={stat.label} className="rounded-3xl bg-white/10 p-5 backdrop-blur">
							<div className="text-xs font-semibold uppercase tracking-wide text-blue-200">{stat.label}</div>
							<div className="mt-3 text-xl font-semibold text-white">{stat.value}</div>
							<div className="text-xs text-blue-100">{stat.change}</div>
						</div>
					))}
				</div>
			</div>
			<div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
				<div className="space-y-6">
					<div className="grid gap-4 sm:grid-cols-3">
						{panels.map((panel) => (
							<div key={panel.title} className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
								<div className="text-sm font-semibold text-blue-900">{panel.title}</div>
								<p className="mt-2 text-xs text-slate-500">{panel.description}</p>
								<button className="mt-5 rounded-full border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50" type="button">
									{panel.action}
								</button>
							</div>
						))}
					</div>
					<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
						<h2 className="text-lg font-semibold text-blue-900">Hoạt động gần đây</h2>
						<ul className="mt-5 space-y-3 text-sm text-slate-600">
							<li>• [09:12] Đơn hàng #5123 đã giao thành công (COD).</li>
							<li>• [08:45] Nhập kho 20 bộ Raspberry Pi 5 8GB.</li>
							<li>• [08:10] Khách hàng Nguyễn Văn B gửi yêu cầu hỗ trợ kỹ thuật.</li>
						</ul>
					</div>
				</div>
				<div className="space-y-6">
					<div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
						<h3 className="text-base font-semibold text-slate-900">Nhắc việc hôm nay</h3>
						<ul className="mt-3 space-y-2">
							<li>• Xác nhận thanh toán cho đơn #5118.</li>
							<li>• Kiểm tra tồn kho module cảm biến khí MQ-4.</li>
							<li>• Cập nhật chính sách bảo hành trên website.</li>
						</ul>
					</div>
					<div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
						<h3 className="text-base font-semibold text-blue-700">Trung tâm quản trị</h3>
						<p className="mt-3">Đội ngũ kỹ thuật sẵn sàng hỗ trợ nâng cấp hệ thống, tích hợp ERP và tự động hóa kho.</p>
						<button className="mt-5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow hover:bg-blue-50" type="button">
							Liên hệ DevOps
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
