# Giải thích và Sửa lỗi: "getaddrinfo ENOTFOUND db"

## 🔴 Lỗi hiện tại:
```
Đăng ký thất bại: getaddrinfo ENOTFOUND db
```

## 📋 Giải thích:

**"getaddrinfo ENOTFOUND db"** có nghĩa là:
- Backend không thể tìm thấy hostname **"db"**
- Hostname "db" chỉ hoạt động **trong Docker network**
- Nếu backend chạy **local** (npm run dev), nó không thể resolve "db"

## 🔍 Nguyên nhân:

Có 2 trường hợp:

### Trường hợp 1: Backend chạy LOCAL, Database chạy trong DOCKER
- ✅ Database container đang chạy
- ❌ Backend chạy bằng `npm run dev` (không trong Docker)
- → Backend không thể tìm thấy hostname "db"

### Trường hợp 2: Cả 2 đều chạy LOCAL
- ❌ Database container không chạy
- ❌ Backend chạy local
- → Không có database để kết nối

## ✅ Giải pháp:

### **Giải pháp 1: Chạy TẤT CẢ trong Docker (Khuyến nghị)**

```bash
# Dừng tất cả containers
docker-compose down

# Khởi động lại tất cả (backend + database + frontend)
docker-compose up -d --build

# Xem logs để đảm bảo mọi thứ chạy đúng
docker-compose logs -f backend
```

**Ưu điểm:**
- ✅ Tất cả services trong cùng Docker network
- ✅ Hostname "db" hoạt động tự động
- ✅ Không cần cấu hình thêm

---

### **Giải pháp 2: Chạy Database trong Docker, Backend chạy LOCAL**

**Bước 1:** Khởi động database container
```bash
docker-compose up -d db
```

**Bước 2:** Đợi database khởi động (30-60 giây)
```bash
docker-compose logs -f db
# Đợi thấy dòng: "ready for connections"
```

**Bước 3:** Tạo file `.env` trong thư mục `backend/`:
```env
DB_HOST=localhost
DB_PORT=3307
DB_USER=ecomuser
DB_PASSWORD=ecompass
DB_NAME=ecommerce
```

**Bước 4:** Chạy backend local
```bash
cd backend
npm install
npm run dev
```

**Lưu ý:** Port 3307 là port được map từ container (xem docker-compose.yml)

---

### **Giải pháp 3: Chạy TẤT CẢ LOCAL (không dùng Docker)**

**Bước 1:** Cài đặt MySQL local
- Windows: Download MySQL Installer
- Mac: `brew install mysql`
- Linux: `sudo apt install mysql-server`

**Bước 2:** Tạo database và user
```sql
CREATE DATABASE ecommerce;
CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'ecompass';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;
```

**Bước 3:** Chạy script init.sql
```bash
mysql -u ecomuser -pecompass ecommerce < db/init.sql
```

**Bước 4:** Tạo file `.env` trong `backend/`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=ecomuser
DB_PASSWORD=ecompass
DB_NAME=ecommerce
```

**Bước 5:** Chạy backend
```bash
cd backend
npm run dev
```

---

## 🧪 Kiểm tra kết nối:

### Kiểm tra Database container:
```bash
# Xem containers đang chạy
docker ps

# Xem logs database
docker-compose logs db

# Kiểm tra database có sẵn sàng không
docker exec -it ecom_mysql mysql -u ecomuser -pecompass -e "SELECT 1"
```

### Kiểm tra Backend connection:
```bash
# Nếu backend chạy trong Docker
curl http://localhost:8080/api/health/db

# Hoặc mở browser
# http://localhost:8080/api/health/db
```

### Test từ backend local:
```bash
# Trong thư mục backend
node -e "
const mysql = require('mysql2/promise');
(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      port: 3307,
      user: 'ecomuser',
      password: 'ecompass',
      database: 'ecommerce'
    });
    console.log('✅ Kết nối thành công!');
    await conn.end();
  } catch (e) {
    console.error('❌ Lỗi:', e.message);
  }
})();
"
```

---

## 📝 Cấu hình đã được cập nhật:

File `backend/src/lib/db.js` đã được sửa để:
- ✅ Mặc định dùng `localhost:3307` khi chạy local
- ✅ Tự động dùng `db:3306` khi chạy trong Docker (docker-compose sẽ override)
- ✅ Log thông tin kết nối để debug

---

## 🚀 Khuyến nghị:

**Cách tốt nhất:** Chạy tất cả trong Docker
```bash
docker-compose up -d --build
```

Lý do:
- ✅ Môi trường nhất quán
- ✅ Dễ deploy
- ✅ Không cần cài đặt MySQL local
- ✅ Tự động cấu hình network

---

## ❓ Vẫn gặp lỗi?

1. **Kiểm tra database có chạy không:**
   ```bash
   docker ps | grep mysql
   ```

2. **Kiểm tra port có bị chiếm không:**
   ```bash
   # Windows
   netstat -ano | findstr :3307
   
   # Mac/Linux
   lsof -i :3307
   ```

3. **Kiểm tra logs:**
   ```bash
   docker-compose logs backend | grep -i error
   docker-compose logs db | grep -i error
   ```

4. **Reset tất cả:**
   ```bash
   docker-compose down -v
   docker-compose up -d --build
   ```

