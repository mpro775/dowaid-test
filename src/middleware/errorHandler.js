const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log الخطأ للتطوير
  console.error(err);

  // خطأ Mongoose - ObjectId غير صحيح
  if (err.name === 'CastError') {
    const message = 'معرف غير صحيح';
    error = { message, statusCode: 400 };
  }

  // خطأ Mongoose - Duplicate key
  if (err.code === 11000) {
    const message = 'هذا الصنف موجود بالفعل';
    error = { message, statusCode: 400 };
  }

  // خطأ Mongoose - Validation
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    error = { message, statusCode: 400 };
  }

  // خطأ express-validator
  if (err.array && typeof err.array === 'function') {
    const errors = err.array();
    const message = errors.map((e) => e.msg).join(', ');
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'خطأ في الخادم',
  });
};

module.exports = errorHandler;

