const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'اسم الصنف مطلوب'],
      trim: true,
      minlength: [2, 'اسم الصنف يجب أن يكون على الأقل حرفين'],
      maxlength: [100, 'اسم الصنف لا يمكن أن يتجاوز 100 حرف'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'الوصف لا يمكن أن يتجاوز 500 حرف'],
    },
    price: {
      type: Number,
      required: [true, 'السعر مطلوب'],
      min: [0, 'السعر لا يمكن أن يكون سالباً'],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'الكمية لا يمكن أن تكون سالبة'],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'اسم الفئة لا يمكن أن يتجاوز 50 حرف'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // إضافة createdAt و updatedAt تلقائياً
    strict: false, // 👈 يسمح بأي حقول إضافية
  }
);

// Index للبحث السريع
itemSchema.index({ name: 'text', description: 'text' });
itemSchema.index({ category: 1 });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

