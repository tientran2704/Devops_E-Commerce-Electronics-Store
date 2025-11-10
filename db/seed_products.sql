-- Seed data: Categories và Products cho Hshop.vn
USE ecommerce;

-- Insert Categories
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Arduino & Kit học tập', 'Arduino boards, shields và các kit học tập lập trình'),
(2, 'Cảm biến & Module', 'Cảm biến nhiệt độ, độ ẩm, ánh sáng, chuyển động và các module chức năng'),
(3, 'Raspberry Pi & SBC', 'Raspberry Pi, NVIDIA Jetson và các máy tính nhúng SBC khác'),
(4, 'AI & IoT', 'Phần cứng AI, IoT modules và development boards'),
(5, 'Robot & DIY', 'Khung robot, bánh xe, động cơ và phụ kiện DIY'),
(6, 'Động cơ & Driver', 'Động cơ DC, servo, stepper và mạch điều khiển'),
(7, 'Thiết bị đo lường', 'Multimeter, oscilloscope, máy đo khoảng cách'),
(8, 'Phụ kiện & Linh kiện', 'Dây cắm, breadboard, connector và linh kiện điện tử');

-- Insert Products (50+ sản phẩm)
INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES
-- Arduino & Kit học tập
('Arduino Uno R3 (Original - Made In Italy)', 'Arduino Uno R3 chính hãng từ Italy, board phổ biến nhất cho người mới bắt đầu. Microcontroller ATmega328P, 14 digital pins, 6 analog inputs.', 250000, 50, 1, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Arduino Nano V3.0', 'Arduino Nano nhỏ gọn, tương thích với Arduino Uno. Phù hợp cho các dự án cần kích thước nhỏ.', 180000, 30, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'),
('Arduino Mega 2560 R3', 'Arduino Mega với 54 digital pins, 16 analog inputs. Phù hợp cho dự án cần nhiều I/O pins.', 450000, 25, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'),
('Arduino Starter Kit', 'Kit học tập Arduino đầy đủ bao gồm board, breadboard, dây cắm, LED, cảm biến và sách hướng dẫn.', 850000, 20, 1, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Arduino Ethernet Shield W5100', 'Shield Ethernet cho Arduino, kết nối mạng LAN. Hỗ trợ TCP/IP protocol.', 320000, 15, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'),
('Arduino Motor Shield L293D', 'Shield điều khiển động cơ DC và servo. Hỗ trợ 2 động cơ DC hoặc 1 stepper motor.', 280000, 18, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'),
('Arduino LCD Shield 16x2', 'Shield màn hình LCD 16x2 với 5 nút bấm. Hiển thị thông tin và điều khiển menu.', 180000, 22, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'),
('Arduino WiFi Shield ESP8266', 'Shield WiFi tích hợp ESP8266. Kết nối Internet không dây cho Arduino.', 350000, 12, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'),

-- Cảm biến & Module
('Cảm biến nhiệt độ DS18B20', 'Cảm biến nhiệt độ digital chính xác, dải đo -55°C đến 125°C. Giao tiếp 1-Wire.', 45000, 100, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến độ ẩm DHT22', 'Cảm biến nhiệt độ và độ ẩm chính xác cao. Dải đo độ ẩm 0-100%RH, nhiệt độ -40°C đến 80°C.', 85000, 80, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến ánh sáng BH1750', 'Cảm biến ánh sáng digital I2C, dải đo 1-65535 lux. Độ chính xác cao, tiêu thụ điện năng thấp.', 65000, 90, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến chuyển động PIR HC-SR501', 'Cảm biến phát hiện chuyển động người. Phạm vi phát hiện 7m, góc 110 độ.', 55000, 120, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến siêu âm HC-SR04', 'Cảm biến đo khoảng cách bằng sóng siêu âm. Dải đo 2cm-400cm, độ chính xác ±3mm.', 35000, 150, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến gas MQ-2', 'Cảm biến phát hiện khí gas LPG, propane, hydrogen. Đầu ra analog và digital.', 45000, 60, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Cảm biến mưa', 'Cảm biến phát hiện mưa và độ ẩm. Module có LED báo trạng thái, đầu ra digital và analog.', 25000, 100, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Module Relay 4 kênh', 'Module relay 4 kênh cách ly quang, điều khiển thiết bị AC/DC. Điện áp điều khiển 5V.', 85000, 70, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Module Bluetooth HC-05', 'Module Bluetooth 2.0, baud rate 9600-115200. Giao tiếp UART, dễ dàng tích hợp.', 95000, 50, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Module WiFi ESP8266 NodeMCU', 'Module WiFi ESP8266 với USB, tích hợp CP2102. Lập trình bằng Arduino IDE.', 120000, 40, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Module RFID RC522', 'Module đọc thẻ RFID 13.56MHz. Hỗ trợ thẻ MIFARE Classic, đọc ghi dữ liệu.', 75000, 45, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Module GPS NEO-6M', 'Module GPS với anten tích hợp. Độ chính xác cao, hỗ trợ NMEA protocol.', 180000, 30, 2, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),

-- Raspberry Pi & SBC
('Raspberry Pi 4 Model B 4GB RAM', 'Raspberry Pi 4 với 4GB RAM, CPU 1.5GHz quad-core, WiFi và Bluetooth tích hợp. Phù hợp cho dự án IoT và media center.', 1850000, 15, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Raspberry Pi 4 Model B 8GB RAM', 'Raspberry Pi 4 với 8GB RAM, hiệu năng cao nhất. Phù hợp cho máy chủ nhỏ và dự án AI.', 2450000, 10, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Raspberry Pi Zero 2 W', 'Raspberry Pi Zero 2 W nhỏ gọn, WiFi và Bluetooth tích hợp. Phù hợp cho dự án IoT nhỏ gọn.', 850000, 20, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Raspberry Pi Pico', 'Microcontroller board với RP2040, 2MB Flash. Lập trình bằng MicroPython hoặc C/C++.', 120000, 50, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('NVIDIA Jetson Nano Developer Kit', 'Development kit AI với GPU 128-core NVIDIA Maxwell. Phù hợp cho dự án computer vision và AI.', 8500000, 5, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Raspberry Pi Camera Module V2', 'Camera 8MP cho Raspberry Pi, hỗ trợ 1080p video. Kết nối qua CSI interface.', 650000, 25, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Raspberry Pi Official Case', 'Vỏ bảo vệ chính hãng cho Raspberry Pi 4, có quạt tản nhiệt. Thiết kế đẹp, tản nhiệt tốt.', 180000, 30, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('MicroSD Card 32GB Class 10', 'Thẻ nhớ MicroSD 32GB Class 10, tốc độ đọc 100MB/s. Phù hợp cho Raspberry Pi.', 120000, 100, 3, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),

-- AI & IoT
('ESP32 Development Board', 'ESP32 với WiFi và Bluetooth dual-mode, 2 CPU cores. Phù hợp cho dự án IoT.', 180000, 35, 4, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('ESP32-CAM', 'ESP32 với camera OV2640, WiFi tích hợp. Phù hợp cho dự án IoT camera, streaming video.', 350000, 20, 4, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Arduino IoT Cloud Compatible Board', 'Board Arduino tương thích với Arduino IoT Cloud. Kết nối và điều khiển từ xa qua cloud.', 450000, 15, 4, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('LoRa Module SX1278', 'Module LoRa tầm xa, phạm vi lên đến 10km. Phù hợp cho mạng IoT tầm xa.', 250000, 18, 4, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Zigbee Module XBee S2C', 'Module Zigbee 2.4GHz, mạng mesh. Phù hợp cho smart home và industrial IoT.', 320000, 12, 4, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),

-- Robot & DIY
('Khung Robot 2 bánh', 'Khung robot 2 bánh với động cơ DC, phù hợp cho dự án line follower và obstacle avoidance.', 280000, 25, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Khung Robot 4 bánh', 'Khung robot 4 bánh với 4 động cơ DC, ổn định và mạnh mẽ. Phù hợp cho dự án lớn.', 450000, 20, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Bánh xe robot 65mm', 'Bánh xe robot đường kính 65mm, cao su mềm. Phù hợp cho nhiều loại khung robot.', 35000, 100, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Bánh xe robot 80mm', 'Bánh xe robot đường kính 80mm, bền và chống trượt. Phù hợp cho robot lớn.', 45000, 80, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Servo Motor SG90', 'Servo motor mini SG90, góc quay 180 độ. Mô-men xoắn 1.8kg/cm, phù hợp cho robot nhỏ.', 45000, 150, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Servo Motor MG996R', 'Servo motor mạnh mẽ MG996R, mô-men xoắn 10kg/cm. Phù hợp cho robot lớn và cánh tay robot.', 120000, 40, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Khung cánh tay robot 4 bậc', 'Khung cánh tay robot 4 bậc tự do, điều khiển bằng servo. Phù hợp cho dự án học tập.', 850000, 10, 5, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),

-- Động cơ & Driver
('Động cơ DC 12V 100RPM', 'Động cơ DC 12V tốc độ 100RPM, mô-men xoắn cao. Phù hợp cho robot và xe điều khiển.', 85000, 60, 6, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Động cơ DC 12V 200RPM', 'Động cơ DC 12V tốc độ 200RPM, cân bằng giữa tốc độ và mô-men. Phù hợp cho nhiều ứng dụng.', 95000, 55, 6, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Driver động cơ L298N', 'Module driver động cơ L298N, điều khiển 2 động cơ DC hoặc 1 stepper. Dòng tối đa 2A mỗi kênh.', 65000, 80, 6, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Driver động cơ TB6600', 'Driver stepper motor TB6600, dòng tối đa 4A. Hỗ trợ microstep, phù hợp cho CNC và 3D printer.', 180000, 25, 6, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Stepper Motor NEMA 17', 'Stepper motor NEMA 17, góc bước 1.8 độ. Mô-men xoắn 3.2kg/cm, phù hợp cho CNC và 3D printer.', 280000, 30, 6, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Stepper Motor NEMA 23', 'Stepper motor NEMA 23 mạnh mẽ, mô-men xoắn cao. Phù hợp cho máy CNC công nghiệp.', 650000, 15, 6, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),

-- Thiết bị đo lường
('Multimeter Digital DT830B', 'Đồng hồ vạn năng digital DT830B, đo điện áp, dòng điện, điện trở. Phù hợp cho người mới bắt đầu.', 180000, 40, 7, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Oscilloscope Mini DSO138', 'Oscilloscope mini DSO138, tần số 200kHz. Màn hình TFT 2.4 inch, phù hợp cho học tập.', 450000, 20, 7, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Máy đo khoảng cách laser', 'Máy đo khoảng cách laser, dải đo 0.05-40m. Độ chính xác ±2mm, màn hình LCD.', 650000, 15, 7, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Máy đo nhiệt độ hồng ngoại', 'Máy đo nhiệt độ không tiếp xúc, dải đo -50°C đến 380°C. Laser pointer, màn hình LCD.', 350000, 25, 7, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),

-- Phụ kiện & Linh kiện
('Breadboard 830 lỗ', 'Breadboard 830 lỗ, kích thước lớn. Phù hợp cho dự án phức tạp, nhiều linh kiện.', 45000, 100, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Dây cắm jumper 40cm', 'Dây cắm jumper đực-đực 40cm, bộ 40 sợi. Nhiều màu, dễ phân biệt.', 25000, 200, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Dây cắm jumper đực-cái', 'Dây cắm jumper đực-cái 40cm, bộ 40 sợi. Kết nối board với module.', 25000, 200, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('LED 5mm đủ màu', 'LED 5mm đủ màu (đỏ, xanh lá, xanh dương, vàng, trắng), bộ 100 cái. Điện áp 2-3.3V.', 35000, 150, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Điện trở 1/4W bộ 500', 'Bộ điện trở 1/4W giá trị từ 10Ω đến 1MΩ, bộ 500 cái. Phù hợp cho học tập và dự án.', 45000, 80, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Tụ điện ceramic bộ 100', 'Bộ tụ điện ceramic giá trị từ 10pF đến 100nF, bộ 100 cái. Nhiều giá trị phổ biến.', 35000, 100, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Nguồn 5V 3A', 'Nguồn adapter 5V 3A, đầu cắm USB. Phù hợp cho Raspberry Pi và các board 5V.', 85000, 50, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Nguồn 12V 2A', 'Nguồn adapter 12V 2A, đầu cắm DC. Phù hợp cho động cơ và các thiết bị 12V.', 95000, 45, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Pin Li-ion 18650', 'Pin Li-ion 18650 3.7V 2600mAh, bộ 2 cái. Phù hợp cho robot và thiết bị di động.', 120000, 60, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600'),
('Mạch sạc pin TP4056', 'Mạch sạc pin Li-ion TP4056 với bảo vệ. Sạc dòng 1A, LED báo trạng thái.', 35000, 80, 8, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600');

