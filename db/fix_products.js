// Script để fix encoding và insert lại sản phẩm
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'ecomuser',
  password: process.env.DB_PASSWORD || 'ecompass',
  database: process.env.DB_NAME || 'ecommerce',
  charset: 'utf8mb4'
};

const products = [
  // Cảm biến & Module
  { name: 'Cảm biến nhiệt độ DS18B20', description: 'Cảm biến nhiệt độ digital chính xác, dải đo -55°C đến 125°C. Giao tiếp 1-Wire.', price: 45000, stock: 100, category_id: 2 },
  { name: 'Cảm biến độ ẩm DHT22', description: 'Cảm biến nhiệt độ và độ ẩm chính xác cao. Dải đo độ ẩm 0-100%RH, nhiệt độ -40°C đến 80°C.', price: 85000, stock: 80, category_id: 2 },
  { name: 'Cảm biến ánh sáng BH1750', description: 'Cảm biến ánh sáng digital I2C, dải đo 1-65535 lux. Độ chính xác cao, tiêu thụ điện năng thấp.', price: 65000, stock: 90, category_id: 2 },
  { name: 'Cảm biến chuyển động PIR HC-SR501', description: 'Cảm biến phát hiện chuyển động người. Phạm vi phát hiện 7m, góc 110 độ.', price: 55000, stock: 120, category_id: 2 },
  { name: 'Cảm biến siêu âm HC-SR04', description: 'Cảm biến đo khoảng cách bằng sóng siêu âm. Dải đo 2cm-400cm, độ chính xác ±3mm.', price: 35000, stock: 150, category_id: 2 },
  { name: 'Cảm biến gas MQ-2', description: 'Cảm biến phát hiện khí gas LPG, propane, hydrogen. Đầu ra analog và digital.', price: 45000, stock: 60, category_id: 2 },
  { name: 'Cảm biến mưa', description: 'Cảm biến phát hiện mưa và độ ẩm. Module có LED báo trạng thái, đầu ra digital và analog.', price: 25000, stock: 100, category_id: 2 },
  { name: 'Module Relay 4 kênh', description: 'Module relay 4 kênh cách ly quang, điều khiển thiết bị AC/DC. Điện áp điều khiển 5V.', price: 85000, stock: 70, category_id: 2 },
  // Robot & DIY
  { name: 'Khung Robot 2 bánh', description: 'Khung robot 2 bánh với động cơ DC, phù hợp cho dự án line follower và obstacle avoidance.', price: 280000, stock: 25, category_id: 5 },
  { name: 'Khung Robot 4 bánh', description: 'Khung robot 4 bánh với 4 động cơ DC, ổn định và mạnh mẽ. Phù hợp cho dự án lớn.', price: 450000, stock: 20, category_id: 5 },
  { name: 'Bánh xe robot 65mm', description: 'Bánh xe robot đường kính 65mm, cao su mềm. Phù hợp cho nhiều loại khung robot.', price: 35000, stock: 100, category_id: 5 },
  { name: 'Bánh xe robot 80mm', description: 'Bánh xe robot đường kính 80mm, bền và chống trượt. Phù hợp cho robot lớn.', price: 45000, stock: 80, category_id: 5 },
  { name: 'Khung cánh tay robot 4 bậc', description: 'Khung cánh tay robot 4 bậc tự do, điều khiển bằng servo. Phù hợp cho dự án học tập.', price: 850000, stock: 10, category_id: 5 },
  // Động cơ & Driver
  { name: 'Động cơ DC 12V 100RPM', description: 'Động cơ DC 12V tốc độ 100RPM, mô-men xoắn cao. Phù hợp cho robot và xe điều khiển.', price: 85000, stock: 60, category_id: 6 },
  { name: 'Động cơ DC 12V 200RPM', description: 'Động cơ DC 12V tốc độ 200RPM, cân bằng giữa tốc độ và mô-men. Phù hợp cho nhiều ứng dụng.', price: 95000, stock: 55, category_id: 6 },
  { name: 'Driver động cơ L298N', description: 'Module driver động cơ L298N, điều khiển 2 động cơ DC hoặc 1 stepper. Dòng tối đa 2A mỗi kênh.', price: 65000, stock: 80, category_id: 6 },
  { name: 'Driver động cơ TB6600', description: 'Driver stepper motor TB6600, dòng tối đa 4A. Hỗ trợ microstep, phù hợp cho CNC và 3D printer.', price: 180000, stock: 25, category_id: 6 },
  // Phụ kiện & Linh kiện
  { name: 'Dây cắm jumper 40cm', description: 'Dây cắm jumper đực-đực 40cm, bộ 40 sợi. Nhiều màu, dễ phân biệt.', price: 25000, stock: 200, category_id: 8 },
  { name: 'Dây cắm jumper đực-cái', description: 'Dây cắm jumper đực-cái 40cm, bộ 40 sợi. Kết nối board với module.', price: 25000, stock: 200, category_id: 8 },
  { name: 'LED 5mm đủ màu', description: 'LED 5mm đủ màu (đỏ, xanh lá, xanh dương, vàng, trắng), bộ 100 cái. Điện áp 2-3.3V.', price: 35000, stock: 150, category_id: 8 },
  { name: 'Điện trở 1/4W bộ 500', description: 'Bộ điện trở 1/4W giá trị từ 10Ω đến 1MΩ, bộ 500 cái. Phù hợp cho học tập và dự án.', price: 45000, stock: 80, category_id: 8 },
  { name: 'Tụ điện ceramic bộ 100', description: 'Bộ tụ điện ceramic giá trị từ 10pF đến 100nF, bộ 100 cái. Nhiều giá trị phổ biến.', price: 35000, stock: 100, category_id: 8 },
  { name: 'Nguồn 5V 3A', description: 'Nguồn adapter 5V 3A, đầu cắm USB. Phù hợp cho Raspberry Pi và các board 5V.', price: 85000, stock: 50, category_id: 8 },
  { name: 'Nguồn 12V 2A', description: 'Nguồn adapter 12V 2A, đầu cắm DC. Phù hợp cho động cơ và các thiết bị 12V.', price: 95000, stock: 45, category_id: 8 },
  { name: 'Mạch sạc pin TP4056', description: 'Mạch sạc pin Li-ion TP4056 với bảo vệ. Sạc dòng 1A, LED báo trạng thái.', price: 35000, stock: 80, category_id: 8 },
];

async function fixProducts() {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    console.log('Deleting products with encoding issues...');
    await connection.execute('DELETE FROM products WHERE id >= 109 AND id <= 160');
    
    console.log('Inserting products with correct UTF-8 encoding...');
    for (const product of products) {
      const [result] = await connection.execute(
        'INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.stock, product.category_id, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600']
      );
      console.log(`Inserted: ${product.name} (ID: ${result.insertId})`);
    }
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

fixProducts();

