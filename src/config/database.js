const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB متصل بنجاح: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ خطأ في الاتصال بـ MongoDB: ${error.message}`);
    // إعادة محاولة الاتصال بعد 5 ثواني
    setTimeout(connectDB, 5000);
  }
};

// معالجة أحداث الاتصال
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB تم قطع الاتصال');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ خطأ في MongoDB: ${err.message}`);
});

module.exports = connectDB;

