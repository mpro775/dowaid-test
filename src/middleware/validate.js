const { body, param, validationResult } = require('express-validator');

// Validation middleware للتحقق من النتائج
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// قواعد Validation لإنشاء صنف جديد
const validateCreateItem = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('اسم الصنف مطلوب')
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم الصنف يجب أن يكون بين 2 و 100 حرف'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('الوصف لا يمكن أن يتجاوز 500 حرف'),
  body('price')
    .notEmpty()
    .withMessage('السعر مطلوب')
    .isFloat({ min: 0 })
    .withMessage('السعر يجب أن يكون رقماً موجباً'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('الكمية يجب أن تكون رقماً صحيحاً موجباً'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('اسم الفئة لا يمكن أن يتجاوز 50 حرف'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('حالة التوفر يجب أن تكون true أو false'),
  validate,
];

// قواعد Validation لتحديث صنف
const validateUpdateItem = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('اسم الصنف لا يمكن أن يكون فارغاً')
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم الصنف يجب أن يكون بين 2 و 100 حرف'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('الوصف لا يمكن أن يتجاوز 500 حرف'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('السعر يجب أن يكون رقماً موجباً'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('الكمية يجب أن تكون رقماً صحيحاً موجباً'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('اسم الفئة لا يمكن أن يتجاوز 50 حرف'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('حالة التوفر يجب أن تكون true أو false'),
  validate,
];

// قواعد Validation للـ ID
const validateItemId = [
  param('id')
    .notEmpty()
    .withMessage('معرف الصنف مطلوب')
    .isMongoId()
    .withMessage('معرف الصنف غير صحيح'),
  validate,
];

module.exports = {
  validateCreateItem,
  validateUpdateItem,
  validateItemId,
};

