# Hướng dẫn Debug Lỗi Đăng Ký Tài Khoản

## Các cải tiến đã thực hiện:

### 1. Backend (auth.js)
- ✅ Thêm error logging chi tiết
- ✅ Thông báo lỗi bằng tiếng Việt
- ✅ Xử lý các lỗi database cụ thể:
  - Lỗi kết nối database
  - Lỗi trùng email
  - Lỗi validation
- ✅ Thông báo lỗi rõ ràng hơn

### 2. Frontend (Register.jsx)
- ✅ Validation phía client trước khi gửi request
- ✅ Hiển thị lỗi chi tiết từ backend
- ✅ Log lỗi ra console để debug
- ✅ Trim whitespace từ input

### 3. Database (init.sql)
- ✅ Sửa lỗi template string `${MYSQL_DATABASE}`

### 4. Docker Compose
- ✅ Thêm healthcheck cho database
- ✅ Backend đợi database sẵn sàng trước khi khởi động
- ✅ Cấu hình environment variables đầy đủ

## Cách kiểm tra lỗi:

### 1. Kiểm tra Database Connection
```bash
# Kiểm tra database có chạy không
docker-compose ps

# Kiểm tra logs database
docker-compose logs db

# Kiểm tra health check
curl http://localhost:8080/api/health/db
```

### 2. Kiểm tra Backend Logs
```bash
# Xem logs backend
docker-compose logs backend

# Xem logs real-time
docker-compose logs -f backend
```

### 3. Kiểm tra Database Tables
```bash
# Vào container database
docker exec -it ecom_mysql mysql -u ecomuser -pecompass ecommerce

# Kiểm tra table users có tồn tại không
SHOW TABLES;
DESCRIBE users;

# Kiểm tra dữ liệu
SELECT * FROM users;
```

### 4. Kiểm tra Frontend Console
- Mở Developer Tools (F12)
- Xem tab Console để thấy lỗi chi tiết
- Xem tab Network để kiểm tra request/response

## Các lỗi thường gặp:

### 1. "Không thể kết nối đến cơ sở dữ liệu"
- **Nguyên nhân**: Database chưa khởi động hoặc cấu hình sai
- **Giải pháp**: 
  - Kiểm tra `docker-compose ps` xem database có chạy không
  - Kiểm tra environment variables trong docker-compose.yml
  - Đợi database khởi động hoàn toàn (có thể mất 30-60 giây)

### 2. "Email đã được sử dụng"
- **Nguyên nhân**: Email đã tồn tại trong database
- **Giải pháp**: 
  - Dùng email khác
  - Hoặc đăng nhập với email đó
  - Hoặc xóa user cũ trong database

### 3. "Mật khẩu phải có ít nhất 6 ký tự"
- **Nguyên nhân**: Validation phía client/backend
- **Giải pháp**: Nhập mật khẩu có ít nhất 6 ký tự

### 4. "Email không hợp lệ"
- **Nguyên nhân**: Format email sai
- **Giải pháp**: Nhập email đúng format (có @ và domain)

## Test đăng ký:

### 1. Test với curl
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Test trong browser
- Mở http://localhost:3000/register
- Điền form và submit
- Xem lỗi (nếu có) trong console và trên form

## Nếu vẫn gặp lỗi:

1. **Kiểm tra logs chi tiết**:
   ```bash
   docker-compose logs backend | grep -i error
   docker-compose logs db | grep -i error
   ```

2. **Restart containers**:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

3. **Reset database** (CẨN THẬN - sẽ xóa dữ liệu):
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

4. **Kiểm tra file .env**:
   - Đảm bảo file `backend/.env` tồn tại
   - Kiểm tra các biến môi trường có đúng không

## Liên hệ hỗ trợ:

Nếu vẫn gặp vấn đề, vui lòng cung cấp:
- Logs từ `docker-compose logs backend`
- Logs từ `docker-compose logs db`
- Screenshot lỗi từ browser console
- Response từ API (xem trong Network tab)

