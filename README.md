# مشروع إدارة الأصناف - Node.js + Express + MongoDB

مشروع Backend احترافي لإدارة الأصناف (CRUD) يوضح أفضل الممارسات في تطوير APIs باستخدام Node.js و Express و MongoDB.

## المميزات

- ✅ **CRUD كامل**: إنشاء، قراءة، تحديث، وحذف الأصناف
- ✅ **Validation**: التحقق من صحة البيانات باستخدام express-validator
- ✅ **Error Handling**: معالج أخطاء مركزي احترافي
- ✅ **Pagination**: تقسيم النتائج إلى صفحات
- ✅ **Search & Filter**: البحث والفلترة حسب الاسم والفئة
- ✅ **Code Organization**: هيكل منظم باستخدام MVC Pattern
- ✅ **Environment Variables**: استخدام متغيرات البيئة

## المتطلبات

- Node.js (الإصدار 14 أو أحدث)
- MongoDB (محلي أو MongoDB Atlas)
- npm أو yarn

## التثبيت

1. تثبيت Dependencies:
```bash
npm install
```

2. إعداد ملف `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/items_db
```

3. تشغيل الخادم:
```bash
npm start
```

أو للتطوير مع إعادة التشغيل التلقائي:
```bash
npm run dev
```

## هيكل المشروع

```
dowaid-test/
├── src/
│   ├── config/
│   │   └── database.js          # إعدادات اتصال MongoDB
│   ├── controllers/
│   │   └── itemController.js    # منطق معالجة الطلبات
│   ├── models/
│   │   └── Item.js              # Schema للأصناف
│   ├── routes/
│   │   └── itemRoutes.js        # تعريف المسارات
│   ├── middleware/
│   │   ├── errorHandler.js      # معالج الأخطاء المركزي
│   │   └── validate.js          # Validation middleware
│   ├── utils/
│   │   └── pagination.js        # دوال Pagination
│   └── app.js                   # ملف التطبيق الرئيسي
├── .env                         # متغيرات البيئة
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Base URL
```
http://localhost:3000/api/items
```

### 1. جلب جميع الأصناف
**GET** `/api/items`

**Query Parameters:**
- `page` (optional): رقم الصفحة (افتراضي: 1)
- `limit` (optional): عدد العناصر في الصفحة (افتراضي: 10)
- `search` (optional): البحث في الاسم والوصف
- `category` (optional): فلترة حسب الفئة
- `isAvailable` (optional): فلترة حسب حالة التوفر (true/false)

**مثال Postman:**
```
GET http://localhost:3000/api/items?page=1&limit=10&search=لابتوب&category=إلكترونيات
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "لابتوب",
      "description": "لابتوب عالي الأداء",
      "price": 5000,
      "quantity": 10,
      "category": "إلكترونيات",
      "isAvailable": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

### 2. جلب صنف محدد
**GET** `/api/items/:id`

**مثال Postman:**
```
GET http://localhost:3000/api/items/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "لابتوب",
    "description": "لابتوب عالي الأداء",
    "price": 5000,
    "quantity": 10,
    "category": "إلكترونيات",
    "isAvailable": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. إنشاء صنف جديد
**POST** `/api/items`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "لابتوب",
  "description": "لابتوب عالي الأداء",
  "price": 5000,
  "quantity": 10,
  "category": "إلكترونيات",
  "isAvailable": true
}
```

**ملاحظة:** الحقول المطلوبة فقط: `name` و `price`. باقي الحقول اختيارية.

**مثال Postman:**
```
POST http://localhost:3000/api/items
Body (raw JSON):
{
  "name": "لابتوب",
  "description": "لابتوب عالي الأداء",
  "price": 5000,
  "quantity": 10,
  "category": "إلكترونيات",
  "isAvailable": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء الصنف بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "لابتوب",
    "description": "لابتوب عالي الأداء",
    "price": 5000,
    "quantity": 10,
    "category": "إلكترونيات",
    "isAvailable": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. تحديث صنف
**PUT** `/api/items/:id`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):** (جميع الحقول اختيارية - فقط الحقول المراد تحديثها)
```json
{
  "name": "لابتوب محدث",
  "price": 4500,
  "quantity": 15
}
```

**مثال Postman:**
```
PUT http://localhost:3000/api/items/507f1f77bcf86cd799439011
Body (raw JSON):
{
  "name": "لابتوب محدث",
  "price": 4500,
  "quantity": 15
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم تحديث الصنف بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "لابتوب محدث",
    "description": "لابتوب عالي الأداء",
    "price": 4500,
    "quantity": 15,
    "category": "إلكترونيات",
    "isAvailable": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 5. حذف صنف
**DELETE** `/api/items/:id`

**مثال Postman:**
```
DELETE http://localhost:3000/api/items/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "تم حذف الصنف بنجاح",
  "data": {}
}
```

## معالجة الأخطاء

### مثال على خطأ Validation:
**Request:**
```json
POST /api/items
{
  "name": "a",
  "price": -100
}
```

**Response:**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "اسم الصنف يجب أن يكون بين 2 و 100 حرف",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "السعر يجب أن يكون رقماً موجباً",
      "param": "price",
      "location": "body"
    }
  ]
}
```

### مثال على خطأ غير موجود:
**Request:**
```
GET /api/items/invalid-id
```

**Response:**
```json
{
  "success": false,
  "error": "معرف الصنف غير صحيح"
}
```

## نموذج البيانات (Item Schema)

```javascript
{
  name: String (required, 2-100 characters),
  description: String (optional, max 500 characters),
  price: Number (required, min: 0),
  quantity: Number (optional, default: 0, min: 0),
  category: String (optional, max 50 characters),
  isAvailable: Boolean (optional, default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## أمثلة Postman كاملة

### 1. إنشاء صنف جديد
```
Method: POST
URL: http://localhost:3000/api/items
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "هاتف ذكي",
  "description": "هاتف ذكي بمواصفات عالية",
  "price": 3000,
  "quantity": 20,
  "category": "إلكترونيات",
  "isAvailable": true
}
```

### 2. جلب جميع الأصناف مع Pagination
```
Method: GET
URL: http://localhost:3000/api/items?page=1&limit=5
```

### 3. البحث عن أصناف
```
Method: GET
URL: http://localhost:3000/api/items?search=هاتف
```

### 4. فلترة حسب الفئة
```
Method: GET
URL: http://localhost:3000/api/items?category=إلكترونيات
```

### 5. تحديث صنف
```
Method: PUT
URL: http://localhost:3000/api/items/{item_id}
Headers: Content-Type: application/json
Body (raw JSON):
{
  "price": 2800,
  "quantity": 15
}
```

### 6. حذف صنف
```
Method: DELETE
URL: http://localhost:3000/api/items/{item_id}
```

## الميزات الاحترافية المستخدمة

1. **MVC Pattern**: فصل منطق التطبيق عن Routes و Models
2. **Middleware**: استخدام Middleware للـ Validation و Error Handling
3. **Error Handling**: معالج أخطاء مركزي يغطي جميع أنواع الأخطاء
4. **Validation**: التحقق من صحة البيانات على مستوى Middleware
5. **Pagination**: تقسيم النتائج الكبيرة إلى صفحات
6. **Search & Filter**: إمكانية البحث والفلترة
7. **Environment Variables**: استخدام متغيرات البيئة للإعدادات
8. **Code Organization**: هيكل منظم وسهل الصيانة

## ملاحظات للطلاب

- هذا المشروع يوضح أفضل الممارسات في تطوير APIs
- الكود منظم بطريقة تسهل الصيانة والتطوير
- جميع الأخطاء يتم معالجتها بشكل مركزي
- Validation يتم على مستوى Middleware قبل الوصول للـ Controller
- يمكن بسهولة إضافة ميزات جديدة مثل Authentication و Authorization

## الرخصة

ISC

