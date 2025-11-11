# Hướng dẫn Seed Database

## Vấn đề
Database ban đầu không có dữ liệu sản phẩm, dẫn đến frontend không hiển thị được sản phẩm.

## Giải pháp

### Cách 1: Seed dữ liệu thủ công (đã thực hiện)
```powershell
cd Devops_E-Commerce-Electronics-Store
Get-Content db/seed_products_fixed.sql | docker-compose exec -T db mysql -uroot -prootpassword ecommerce
```

### Cách 2: Seed dữ liệu khi khởi tạo database
File `db/seed_products_fixed.sql` sẽ được tự động import khi database được khởi tạo lần đầu (nếu được mount vào `/docker-entrypoint-initdb.d/`).

### Kiểm tra dữ liệu
```powershell
docker-compose exec -T db mysql -uroot -prootpassword -e "USE ecommerce; SELECT COUNT(*) as total_products FROM products;"
```

## Kết quả
- 60 sản phẩm đã được import
- 8 categories đã được import
- API `/api/products` đã trả về dữ liệu thành công

## Lưu ý
- Nếu database đã tồn tại, cần seed thủ công bằng Cách 1
- Nếu muốn reset database, xóa volume và tạo lại:
  ```powershell
  docker-compose down -v
  docker-compose up -d
  Get-Content db/seed_products_fixed.sql | docker-compose exec -T db mysql -uroot -prootpassword ecommerce
  ```

