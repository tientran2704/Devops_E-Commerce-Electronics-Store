const quickActions = [
	{ title: "Đơn hàng đang xử lý", value: "02", description: "Đơn hàng chờ giao trong ngày hôm nay." },
	{ title: "Đơn hoàn tất", value: "18", description: "Đơn hàng đã giao thành công từ trước đến nay." },
	{ title: "Điểm thành viên", value: "360", description: "Tích lũy từ ưu đãi và chương trình khuyến mãi." },
];

const supportTopics = [
	"Xuất hóa đơn VAT",
	"Gia hạn bảo hành",
	"Đổi trả & hoàn tiền",
	"Tư vấn tích hợp phần cứng",
];

export default function Account() {
	return (
		<section className="max-w-7xl mx-auto px-4 py-16">
			<div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 px-8 py-12 text-white shadow-xl">
				<h1 className="text-3xl font-black">Xin chào, Maker!</h1>
				<p className="mt-3 text-sm text-blue-100">
					Quản lý đơn hàng, địa chỉ và ưu đãi thành viên của bạn. Chúng tôi luôn đồng hành cùng dự án của bạn 24/7.
				</p>
				<button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50" type="button">
					Cập nhật thông tin cá nhân
				</button>
			</div>
			<div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
				<div className="space-y-6">
					<div className="grid gap-4 sm:grid-cols-3">
						{quickActions.map((action) => (
							<div key={action.title} className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
								<div className="text-xs font-semibold uppercase tracking-wide text-blue-600">{action.title}</div>
								<div className="mt-3 text-3xl font-black text-blue-900">{action.value}</div>
								<p className="mt-2 text-xs text-slate-500">{action.description}</p>
							</div>
						))}
					</div>
					<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
						<h2 className="text-lg font-semibold text-blue-900">Địa chỉ giao hàng</h2>
						<div className="mt-4 space-y-2 text-sm text-slate-600">
							<p>Nguyễn Văn A</p>
							<p>269/20 Lý Thường Kiệt, P.Phú Thọ, Q.11, TP.HCM</p>
							<p>Điện thoại: 0909 000 000</p>
						</div>
						<button className="mt-5 rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" type="button">
							Thay đổi địa chỉ
						</button>
					</div>
					<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
						<h2 className="text-lg font-semibold text-blue-900">Lịch sử hỗ trợ</h2>
						<p className="mt-3 text-sm text-slate-600">
							Bạn chưa có yêu cầu hỗ trợ nào trong tháng này. Liên hệ Hshop.vn để được tư vấn kỹ thuật nhanh chóng.
						</p>
						<button className="mt-5 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700" type="button">
							Tạo yêu cầu hỗ trợ mới
						</button>
					</div>
				</div>
				<div className="space-y-6">
					<div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
						<h3 className="text-base font-semibold text-slate-900">Thông báo mới</h3>
						<ul className="mt-3 space-y-2">
							<li>• Workshop AIoT dành cho Maker - đăng ký trước 20/11.</li>
							<li>• Ưu đãi 10% cho board NVIDIA Jetson tuần này.</li>
							<li>• Hshop.vn nghỉ Chủ Nhật, vui lòng đặt lịch lấy hàng trước.</li>
						</ul>
					</div>
					<div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
						<h3 className="text-base font-semibold text-blue-700">Cần hỗ trợ nhanh?</h3>
						<ul className="mt-3 space-y-2">
							{supportTopics.map((topic) => (
								<li key={topic}>• {topic}</li>
							))}
						</ul>
						<button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50" type="button">
							Chat với Hshop.vn
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
