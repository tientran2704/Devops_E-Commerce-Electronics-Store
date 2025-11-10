-- Re-insert products with correct UTF-8 encoding
USE ecommerce;
SET NAMES utf8mb4;

INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES
('Cảm biến nhiệt độ DS18B20', 'Cảm biến nhiệt độ digital chính xác, dải đo -55°C đến 125°C. Giao tiếp 1-Wire.', 45000, 100, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến độ ẩm DHT22', 'Cảm biến nhiệt độ và độ ẩm chính xác cao. Dải đo độ ẩm 0-100%RH, nhiệt độ -40°C đến 80°C.', 85000, 80, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến ánh sáng BH1750', 'Cảm biến ánh sáng digital I2C, dải đo 1-65535 lux. Độ chính xác cao, tiêu thụ điện năng thấp.', 65000, 90, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến chuyển động PIR HC-SR501', 'Cảm biến phát hiện chuyển động người. Phạm vi phát hiện 7m, góc 110 độ.', 55000, 120, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến siêu âm HC-SR04', 'Cảm biến đo khoảng cách bằng sóng siêu âm. Dải đo 2cm-400cm, độ chính xác ±3mm.', 35000, 150, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến gas MQ-2', 'Cảm biến phát hiện khí gas LPG, propane, hydrogen. Đầu ra analog và digital.', 45000, 60, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến mưa', 'Cảm biến phát hiện mưa và độ ẩm. Module có LED báo trạng thái, đầu ra digital và analog.', 25000, 100, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Module Relay 4 kênh', 'Module relay 4 kênh cách ly quang, điều khiển thiết bị AC/DC. Điện áp điều khiển 5V.', 85000, 70, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Khung Robot 2 bánh', 'Khung robot 2 bánh với động cơ DC, phù hợp cho dự án line follower và obstacle avoidance.', 280000, 25, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Khung Robot 4 bánh', 'Khung robot 4 bánh với 4 động cơ DC, ổn định và mạnh mẽ. Phù hợp cho dự án lớn.', 450000, 20, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Bánh xe robot 65mm', 'Bánh xe robot đường kính 65mm, cao su mềm. Phù hợp cho nhiều loại khung robot.', 35000, 100, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Bánh xe robot 80mm', 'Bánh xe robot đường kính 80mm, bền và chống trượt. Phù hợp cho robot lớn.', 45000, 80, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Dây cắm jumper 40cm', 'Dây cắm jumper đực-đực 40cm, bộ 40 sợi. Nhiều màu, dễ phân biệt.', 25000, 200, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Dây cắm jumper đực-cái', 'Dây cắm jumper đực-cái 40cm, bộ 40 sợi. Kết nối board với module.', 25000, 200, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('LED 5mm đủ màu', 'LED 5mm đủ màu (đỏ, xanh lá, xanh dương, vàng, trắng), bộ 100 cái. Điện áp 2-3.3V.', 35000, 150, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Điện trở 1/4W bộ 500', 'Bộ điện trở 1/4W giá trị từ 10Ω đến 1MΩ, bộ 500 cái. Phù hợp cho học tập và dự án.', 45000, 80, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Tụ điện ceramic bộ 100', 'Bộ tụ điện ceramic giá trị từ 10pF đến 100nF, bộ 100 cái. Nhiều giá trị phổ biến.', 35000, 100, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Nguồn 5V 3A', 'Nguồn adapter 5V 3A, đầu cắm USB. Phù hợp cho Raspberry Pi và các board 5V.', 85000, 50, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Nguồn 12V 2A', 'Nguồn adapter 12V 2A, đầu cắm DC. Phù hợp cho động cơ và các thiết bị 12V.', 95000, 45, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Mạch sạc pin TP4056', 'Mạch sạc pin Li-ion TP4056 với bảo vệ. Sạc dòng 1A, LED báo trạng thái.', 35000, 80, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600');

