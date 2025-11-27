const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middleware/errorHandler');

// الاتصال بقاعدة البيانات
connectDB();

// إنشاء Express app
const app = express();

// Middleware
app.use(cors()); // السماح بطلبات CORS
app.use(express.json()); // تحليل JSON في الطلبات
app.use(express.urlencoded({ extended: true })); // تحليل URL-encoded

// Routes
app.use('/api/items', itemRoutes);

// Route للصفحة الرئيسية
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'مرحباً بك في API إدارة الأصناف',
    endpoints: {
      'GET /api/items': 'جلب جميع الأصناف',
      'GET /api/items/:id': 'جلب صنف محدد',
      'POST /api/items': 'إنشاء صنف جديد',
      'PUT /api/items/:id': 'تحديث صنف',
      'DELETE /api/items/:id': 'حذف صنف',
    },
  });
});

// معالج الأخطاء (يجب أن يكون في النهاية)
app.use(errorHandler);

// بدء الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
  console.log(`📍 API متاح على: http://localhost:${PORT}/api/items`);
});

module.exports = app;

