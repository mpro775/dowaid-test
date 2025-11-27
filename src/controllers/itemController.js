const Item = require('../models/Item');
const { getPaginationInfo, buildSearchQuery } = require('../utils/pagination');

// جلب جميع الأصناف مع Pagination والبحث
const getAllItems = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // بناء استعلام البحث والفلترة
    const searchQuery = buildSearchQuery(req.query);

    // جلب البيانات
    const items = await Item.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // حساب العدد الإجمالي
    const total = await Item.countDocuments(searchQuery);

    // معلومات Pagination
    const pagination = getPaginationInfo(page, limit, total);

    res.status(200).json({
      success: true,
      data: items,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

// جلب صنف محدد
const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'الصنف غير موجود',
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// إنشاء صنف جديد
const createItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الصنف بنجاح',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// تحديث صنف موجود
const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // إرجاع البيانات المحدثة
        runValidators: true, // تشغيل Validation
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'الصنف غير موجود',
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم تحديث الصنف بنجاح',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// حذف صنف
const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'الصنف غير موجود',
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم حذف الصنف بنجاح',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};

