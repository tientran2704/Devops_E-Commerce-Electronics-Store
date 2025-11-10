-- Fix encoding issues in product names
USE ecommerce;
SET NAMES utf8mb4;

UPDATE products SET name = 'Cảm biến nhiệt độ DS18B20' WHERE id = 9;
UPDATE products SET name = 'Cảm biến độ ẩm DHT22' WHERE id = 10;
UPDATE products SET name = 'Cảm biến ánh sáng BH1750' WHERE id = 11;
UPDATE products SET name = 'Cảm biến chuyển động PIR HC-SR501' WHERE id = 12;
UPDATE products SET name = 'Cảm biến siêu âm HC-SR04' WHERE id = 13;
UPDATE products SET name = 'Cảm biến gas MQ-2' WHERE id = 14;
UPDATE products SET name = 'Cảm biến mưa' WHERE id = 15;
UPDATE products SET name = 'Module Relay 4 kênh' WHERE id = 16;
UPDATE products SET name = 'Khung Robot 2 bánh' WHERE id = 34;
UPDATE products SET name = 'Khung Robot 4 bánh' WHERE id = 35;
UPDATE products SET name = 'Bánh xe robot 65mm' WHERE id = 36;
UPDATE products SET name = 'Bánh xe robot 80mm' WHERE id = 37;
UPDATE products SET name = 'Tụ điện ceramic bộ 100' WHERE id = 51;
UPDATE products SET name = 'Điện trở 1/4W bộ 500' WHERE id = 50;
UPDATE products SET name = 'LED 5mm đủ màu' WHERE id = 49;
UPDATE products SET name = 'Dây cắm jumper đực-cái' WHERE id = 48;
UPDATE products SET name = 'Dây cắm jumper 40cm' WHERE id = 47;
UPDATE products SET name = 'Mạch sạc pin TP4056' WHERE id = 60;
UPDATE products SET name = 'Nguồn 12V 2A' WHERE id = 59;
UPDATE products SET name = 'Nguồn 5V 3A' WHERE id = 58;
