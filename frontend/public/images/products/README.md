# Thư mục ảnh sản phẩm

Thư mục này dùng để lưu trữ ảnh sản phẩm cho website Hshop.vn.

## Cách sử dụng

1. **Thêm ảnh sản phẩm:**
   - Đặt file ảnh vào thư mục này
   - Định dạng khuyến nghị: JPG, PNG, WebP
   - Kích thước khuyến nghị: 600x600px hoặc lớn hơn
   - Tên file: `product-{id}.jpg` hoặc tên mô tả

2. **Truy cập ảnh:**
   - URL: `/images/products/{filename}`
   - Ví dụ: `/images/products/arduino-uno.jpg`

3. **Cập nhật database:**
   - Sau khi thêm ảnh, cập nhật `image_url` trong bảng `products`
   - Ví dụ: `UPDATE products SET image_url = '/images/products/arduino-uno.jpg' WHERE id = 1;`

## Lưu ý

- Ảnh sẽ được serve trực tiếp từ frontend (Nginx)
- Đảm bảo file ảnh có kích thước hợp lý để tối ưu tốc độ tải
- Nên sử dụng CDN hoặc image optimization cho production

