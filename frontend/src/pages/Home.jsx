const featuredCategories = [
	{
		title: "Arduino chính hãng",
		image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
		description: "Board, Shield và phụ kiện chính hãng từ Arduino."
	},
	{
		title: "Raspberry Pi & SBC",
		image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=600&q=80",
		description: "Máy tính nhúng, phụ kiện, HAT và module mở rộng."
	},
	{
		title: "Cảm biến & Module",
		image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
		description: "Đa dạng cảm biến nhiệt độ, chuyển động, môi trường, hình ảnh."
	},
	{
		title: "Robot & DIY",
		image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80",
		description: "Khung robot, động cơ, bánh xe, giải pháp STEM Robotics."
	},
];

const comboProducts = [
	{
		name: "Combo Raspberry Pi 5 RAM 8GB + SSD NVMe",
		price: "5.790.000₫",
		image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
		tag: "Mới về"
	},
	{
		name: "Kit AI Vision MaixCam Lite RISC-V",
		price: "3.450.000₫",
		image: "https://images.unsplash.com/photo-1580894894360-d4f0cbf84379?auto=format&fit=crop&w=600&q=80",
		tag: "Hot"
	},
	{
		name: "Máy đo đa năng FNIRSI® S1",
		price: "1.250.000₫",
		image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
		tag: "Bán chạy"
	},
];

const partnerBrands = [
	"Arduino",
	"Waveshare",
	"DFRobot",
	"Seeed Studio",
	"NVIDIA Jetson",
	"Benewake",
];

const testimonials = [
	{
		name: "Pete Cleveland",
		role: "Engineer",
		message:
			"Best shop in Vietnam for creative technologists. Nhân viên am hiểu, nhiều hàng và hỗ trợ kỹ thuật tuyệt vời."
	},
	{
		name: "Phạm Minh Phát",
		role: "Sinh viên",
		message: "Anh em hỗ trợ tận tình, giải thích kiến thức chuyên ngành giúp mình triển khai dự án tốt hơn."
	},
	{
		name: "Lư Thịnh (Kelvin)",
		role: "Kỹ sư",
		message: "Shop decor xinh, công nghệ, tư vấn thân thiện. Có đủ linh kiện cho dự án Robot & IoT."
	},
];

const guides = [
	{
		title: "Hướng dẫn chọn combo Raspberry Pi 5 cho AI & IoT",
		date: "Tháng 11, 2025",
	},
	{
		title: "TOP 5 cảm biến môi trường cho dự án STEM",
		date: "Tháng 10, 2025",
	},
	{
		title: "Kinh nghiệm triển khai hệ thống Lidar Slamtec",
		date: "Tháng 9, 2025",
	},
];

export default function Home() {
	return (
		<div className="pb-16">
			<section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white">
				<div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center" />
				<div className="relative max-w-7xl mx-auto px-4 py-20 lg:flex lg:items-center lg:gap-16">
					<div className="flex-1 space-y-6">
						<span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
							HSHOP VN
						</span>
						<h1 className="text-4xl font-black leading-tight sm:text-5xl">
							Điện tử &amp; Robot cho Maker, Sinh viên &amp; Doanh nghiệp
						</h1>
						<p className="text-lg text-blue-100">
							Cung cấp giải pháp phần cứng nhanh chóng với hàng ngàn sản phẩm Arduino, Raspberry Pi, AI, IoT, Robot, cảm biến và phụ kiện.
						</p>
						<div className="flex flex-wrap items-center gap-4">
							<a
								href="#san-pham-noi-bat"
								className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50"
							>
								Xem sản phẩm nổi bật
							</a>
							<a
								href="#thuong-hieu"
								className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
							>
								Thương hiệu uy tín
							</a>
						</div>
					</div>
					<div className="mt-10 lg:mt-0 lg:w-96">
						<div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
							<h2 className="text-lg font-semibold text-white">Sẵn sàng hỗ trợ dự án</h2>
							<p className="mt-3 text-sm text-blue-100">
								Kết nối với kỹ sư tư vấn, hỗ trợ xác định linh kiện, giải pháp kỹ thuật nhanh chóng cho dự án AI, IoT &amp; Robotics.
							</p>
							<ul className="mt-4 space-y-3 text-sm text-blue-100">
								<li>• Tư vấn linh kiện qua Zalo 0938.022.500</li>
								<li>• Giao hàng toàn quốc trong 24-48h</li>
								<li>• Hỗ trợ bảo hành chính hãng</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="relative -mt-16 max-w-7xl mx-auto px-4">
				<div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
					<h2 className="text-2xl font-bold text-blue-900">Danh mục nổi bật</h2>
					<p className="mt-2 text-sm text-slate-600">
						Lựa chọn nhanh những danh mục sản phẩm được yêu thích trên Hshop.vn.
					</p>
					<div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
						{featuredCategories.map((category) => (
							<div key={category.title} className="group relative overflow-hidden rounded-2xl bg-slate-50">
								<img src={category.image} alt={category.title} className="h-40 w-full object-cover transition duration-500 group-hover:scale-105" />
								<div className="p-5">
									<h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
									<p className="mt-2 text-sm text-slate-600">{category.description}</p>
									<button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
										Xem danh mục →
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="san-pham-noi-bat" className="mt-16 max-w-7xl mx-auto px-4">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div>
						<h2 className="text-2xl font-bold text-blue-900">Combo ưu đãi cho dự án</h2>
						<p className="text-sm text-slate-600">Hàng về mới, chính sách bảo hành rõ ràng, hỗ trợ kỹ thuật nhanh chóng.</p>
					</div>
					<a href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
						Xem tất cả sản phẩm →
					</a>
				</div>
				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{comboProducts.map((product) => (
						<div key={product.name} className="group rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
							<div className="relative overflow-hidden rounded-2xl bg-slate-100">
								<img src={product.image} alt={product.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
								<span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
									{product.tag}
								</span>
							</div>
							<div className="mt-5 space-y-2">
								<h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
								<p className="text-lg font-bold text-blue-700">{product.price}</p>
								<button className="w-full rounded-full border border-blue-200 bg-blue-50 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100">
									Thêm vào giỏ
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			<section id="thuong-hieu" className="mt-16 bg-white py-12">
				<div className="max-w-7xl mx-auto px-4">
					<h2 className="text-2xl font-bold text-blue-900">Thương hiệu đối tác</h2>
					<p className="mt-2 text-sm text-slate-600">Chính hãng, đa dạng sản phẩm cho mọi nhu cầu học tập &amp; triển khai dự án.</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-8">
						{partnerBrands.map((brand) => (
							<div key={brand} className="flex h-16 w-36 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 shadow-sm">
								{brand}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="mt-16 max-w-7xl mx-auto px-4">
				<div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 px-8 py-12 text-white shadow-xl">
					<div className="flex flex-wrap items-center gap-10">
						<div className="flex-1 space-y-3">
							<h2 className="text-2xl font-bold">Đăng ký nhận thông tin ưu đãi &amp; sản phẩm mới</h2>
							<p className="text-sm text-blue-100">Khuyến mãi, sản phẩm hot, workshop dành cho Maker &amp; Doanh nghiệp.</p>
						</div>
						<form className="flex flex-wrap items-center gap-3">
							<input
								type="email"
								placeholder="Nhập email của bạn"
								className="w-64 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/60"
							/>
							<button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50" type="button">
								Đăng ký
							</button>
						</form>
					</div>
				</div>
			</section>

			<section className="mt-16 max-w-7xl mx-auto px-4">
				<div className="grid gap-10 lg:grid-cols-5">
					<div className="lg:col-span-3 space-y-6">
						<h2 className="text-2xl font-bold text-blue-900">Phản hồi từ khách hàng</h2>
						<div className="grid gap-6 md:grid-cols-3">
							{testimonials.map((testimonial) => (
								<div key={testimonial.name} className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
									<p className="text-sm text-slate-600 leading-relaxed">“{testimonial.message}”</p>
									<div className="mt-4 text-sm font-semibold text-blue-700">{testimonial.name}</div>
									<div className="text-xs uppercase tracking-wide text-slate-400">{testimonial.role}</div>
								</div>
							))}
						</div>
					</div>
					<div className="lg:col-span-2">
						<h2 className="text-2xl font-bold text-blue-900">Hướng dẫn &amp; Review</h2>
						<ul className="mt-6 space-y-4">
							{guides.map((guide) => (
								<li key={guide.title} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-100">
									<div className="text-xs font-semibold uppercase tracking-wide text-blue-600">{guide.date}</div>
									<p className="mt-2 text-sm font-semibold text-slate-900">{guide.title}</p>
									<button className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700">
										Xem chi tiết →
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}

