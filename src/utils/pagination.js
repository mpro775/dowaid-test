/**
 * حساب معلومات Pagination
 * @param {Number} page - رقم الصفحة
 * @param {Number} limit - عدد العناصر في الصفحة
 * @param {Number} total - إجمالي عدد العناصر
 * @returns {Object} معلومات Pagination
 */
const getPaginationInfo = (page, limit, total) => {
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const totalItems = total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

/**
 * إنشاء استعلام البحث والفلترة
 * @param {Object} query - query parameters من الطلب
 * @returns {Object} استعلام MongoDB
 */
const buildSearchQuery = (query) => {
  const searchQuery = {};

  // البحث في الاسم والوصف
  if (query.search) {
    searchQuery.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  // الفلترة حسب الفئة
  if (query.category) {
    searchQuery.category = { $regex: query.category, $options: 'i' };
  }

  // الفلترة حسب حالة التوفر
  if (query.isAvailable !== undefined) {
    searchQuery.isAvailable = query.isAvailable === 'true';
  }

  return searchQuery;
};

module.exports = {
  getPaginationInfo,
  buildSearchQuery,
};

