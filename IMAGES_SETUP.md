# Hướng dẫn sử dụng thư mục ảnh sản phẩm

## 📁 Cấu trúc thư mục

### Frontend (Static Images)
```
frontend/
  └── public/
      └── images/
          └── products/
              ├── README.md
              └── (ảnh sản phẩm ở đây)
```

### Backend (Upload Directory)
```
backend/
  └── uploads/
      └── products/
          ├── README.md
          └── (ảnh được upload từ admin)
```

## 🖼️ Cách thêm ảnh sản phẩm

### 1. Thêm ảnh tĩnh (Static Images)

**Bước 1:** Đặt file ảnh vào thư mục:
```
frontend/public/images/products/
```

**Bước 2:** Đặt tên file theo quy ước:
- `product-{id}.jpg` - Ví dụ: `product-101.jpg`
- Hoặc tên mô tả: `arduino-uno-r3.jpg`

**Bước 3:** Cập nhật database:
```sql
UPDATE products 
SET image_url = '/images/products/product-101.jpg' 
WHERE id = 101;
```

**Bước 4:** Rebuild frontend container:
```bash
docker-compose build frontend
docker-compose up -d frontend
```

### 2. Upload ảnh qua API (Backend)

**Endpoint:** `POST /api/products` (Admin only)

**Request:**
```json
{
  "name": "Tên sản phẩm",
  "description": "Mô tả",
  "price": 250000,
  "stock": 50,
  "category_id": 1,
  "image_url": "/uploads/products/product-101.jpg"
}
```

**Lưu ý:** Cần implement file upload endpoint để xử lý multipart/form-data.

## 🔧 Cấu hình

### Nginx (Frontend)
Đã cấu hình trong `frontend/nginx.conf`:
```nginx
location /images/ {
  alias /usr/share/nginx/html/images/;
  expires 30d;
  add_header Cache-Control "public, immutable";
}
```

### Dockerfile (Frontend)
Đã cấu hình copy thư mục images:
```dockerfile
COPY ./public/images /usr/share/nginx/html/images
```

## 📝 Quy ước đặt tên

1. **Format:** JPG, PNG, WebP
2. **Kích thước:** 
   - Thumbnail: 300x300px
   - Medium: 600x600px
   - Large: 1200x1200px
3. **Tên file:**
   - Sử dụng chữ thường
   - Dùng dấu gạch ngang (-) thay vì khoảng trắng
   - Ví dụ: `arduino-uno-r3.jpg`

## 🚀 Truy cập ảnh

### Static Images (Frontend)
- URL: `http://localhost:3000/images/products/product-101.jpg`
- Hoặc: `/images/products/product-101.jpg` (relative path)

### Uploaded Images (Backend)
- URL: `http://localhost:8081/uploads/products/product-101.jpg`
- Cần cấu hình static file serving trong Express

## ⚠️ Lưu ý

1. **Kích thước file:** Nên optimize ảnh trước khi upload (< 500KB)
2. **CDN:** Nên sử dụng CDN cho production
3. **Backup:** Thư mục images nên được backup định kỳ
4. **Docker Volume:** Có thể mount thư mục images vào Docker volume để persist data

## 📦 Docker Volume (Tùy chọn)

Để persist ảnh khi rebuild container, thêm vào `docker-compose.yml`:

```yaml
services:
  frontend:
    volumes:
      - ./frontend/public/images:/usr/share/nginx/html/images:ro
```

