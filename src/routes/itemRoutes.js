const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const {
  validateCreateItem,
  validateUpdateItem,
  validateItemId,
} = require('../middleware/validate');

// جلب جميع الأصناف
router.get('/', getAllItems);

// جلب صنف محدد
router.get('/:id', validateItemId, getItemById);

// إنشاء صنف جديد
router.post('/', validateCreateItem, createItem);

// تحديث صنف
router.put('/:id', validateItemId, validateUpdateItem, updateItem);

// حذف صنف
router.delete('/:id', validateItemId, deleteItem);

module.exports = router;

