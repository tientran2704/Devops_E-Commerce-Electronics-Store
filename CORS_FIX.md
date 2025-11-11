# Hướng dẫn khắc phục lỗi CORS

## Vấn đề
Frontend đang cố gắng kết nối đến `localhost:8080` thay vì URL backend đã deploy, gây ra lỗi CORS.

## Giải pháp đã thực hiện

### 1. Cập nhật CORS Backend
Backend đã được cập nhật để tự động cho phép:
- Tất cả các domain `.onrender.com` (bao gồm cả frontend và backend trên Render)
- Localhost cho development (`http://localhost:*` và `http://127.0.0.1:*`)
- Các URL được cấu hình trong biến môi trường `FRONTEND_URL`

### 2. Cấu hình Environment Variables

#### Backend (trong render.yaml hoặc Render Dashboard):
- `FRONTEND_URL`: URL của frontend service (ví dụ: `https://ecommerce-frontend.onrender.com`)
  - Có thể đặt nhiều URL phân cách bằng dấu phẩy
  - Nếu không set, backend sẽ tự động cho phép tất cả `.onrender.com` domains

#### Frontend (trong render.yaml hoặc Render Dashboard):
- `VITE_API_BASE`: URL của backend service (ví dụ: `https://ecommerce-backend.onrender.com`)
  - **QUAN TRỌNG**: Biến này phải được set khi build frontend
  - Nếu không set, frontend sẽ dùng mặc định `http://localhost:8080` (sẽ gây lỗi)

## Cách khắc phục

### Bước 1: Kiểm tra URL service trên Render
1. Vào Render Dashboard
2. Kiểm tra URL của backend service (ví dụ: `https://ecommerce-backend.onrender.com`)
3. Kiểm tra URL của frontend service (ví dụ: `https://ecommerce-frontend.onrender.com`)

### Bước 2: Cập nhật Environment Variables

#### Cách 1: Sử dụng render.yaml (khuyến nghị)
1. Mở file `render.yaml`
2. Cập nhật `VITE_API_BASE` trong frontend service với URL backend thực tế
3. Cập nhật `FRONTEND_URL` trong backend service với URL frontend thực tế
4. Commit và push lên repository
5. Render sẽ tự động redeploy

#### Cách 2: Cập nhật trong Render Dashboard
1. Vào Frontend Service → Environment
2. Thêm/Update biến `VITE_API_BASE` = URL backend (ví dụ: `https://ecommerce-backend.onrender.com`)
3. Vào Backend Service → Environment  
4. Thêm/Update biến `FRONTEND_URL` = URL frontend (ví dụ: `https://ecommerce-frontend.onrender.com`)
5. **QUAN TRỌNG**: Sau khi update environment variable, cần **rebuild** frontend service vì Vite cần biến này khi build

### Bước 3: Rebuild Frontend Service
**QUAN TRỌNG**: Sau khi set `VITE_API_BASE`, bạn **PHẢI** rebuild frontend service:
1. Vào Frontend Service trên Render Dashboard
2. Click "Manual Deploy" → "Clear build cache & deploy"
3. Hoặc trigger một commit mới để Render tự động rebuild

## Kiểm tra

Sau khi rebuild, kiểm tra:
1. Mở Developer Console (F12) trên frontend
2. Không còn lỗi CORS
3. API requests được gửi đến đúng backend URL (không phải localhost:8080)
4. Dữ liệu sản phẩm được load thành công

## Lưu ý

- Backend CORS đã được cấu hình để tự động cho phép tất cả `.onrender.com` domains, nên ngay cả khi `FRONTEND_URL` không được set chính xác, backend vẫn sẽ cho phép request từ frontend.
- Vấn đề chính là frontend đang dùng `localhost:8080` vì `VITE_API_BASE` không được set khi build.
- Vite environment variables được thay thế tại **build time**, không phải runtime, nên cần rebuild sau khi thay đổi.

## Troubleshooting

### Vẫn còn lỗi CORS sau khi rebuild
- Kiểm tra lại URL backend trong `VITE_API_BASE` có đúng không
- Kiểm tra backend service có đang chạy không
- Kiểm tra backend logs xem có nhận được request không

### Frontend vẫn gọi localhost:8080
- Đảm bảo `VITE_API_BASE` đã được set trong Render Dashboard
- Đảm bảo đã rebuild frontend sau khi set environment variable
- Kiểm tra build logs xem environment variable có được inject không

### Backend không nhận request
- Kiểm tra backend service có đang chạy không
- Kiểm tra backend logs
- Kiểm tra CORS configuration trong `backend/src/index.js`

