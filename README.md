# 🛍️ Hoàn Hoa Hồng — Web Hoàn Tiền Shopee

## Cấu trúc
```
hoanhoahong/
├── app/
│   ├── layout.js
│   ├── page.js                  ← Giao diện đăng nhập + chuyển link
│   └── api/convert/route.js     ← API chuyển đổi link
├── package.json
└── next.config.js
```

## Cách hoạt động
1. Khách vào web → nhập tên Shopee theo cú pháp `tên + 5 số cuối SĐT` (vd: `thanhthao96474`)
2. Hệ thống xác nhận định dạng → cho vào trang chuyển link
3. Khách dán link Shopee → nhận link hoàn tiền có sub_id = tên đăng nhập
4. Khách mua qua link đó → bạn tracking được theo từng người

## ⚙️ Affiliate ID
Mở `app/api/convert/route.js` dòng đầu:
```js
const AFFILIATE_ID = "17395950528"; // ← ID của bạn, đã điền sẵn
```

## 🚀 Deploy lên Vercel
1. Đẩy thư mục này lên GitHub
2. Vào vercel.com → Add New Project → chọn repo
3. Deploy — xong sau ~1 phút

## 💻 Chạy local
```bash
npm install
npm run dev
# Mở http://localhost:3000
```
