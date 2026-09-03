# 💜 Website Lưu Bút Sinh Nhật Tuổi 32 - Jimmy Jitaraphol (P'Jim)

Website lưu bút trực tuyến sang trọng, lấp lánh lung linh dành riêng cho dịp sinh nhật tuổi 32 của **Dr. Jimmy Jitaraphol Potiwihok**.

---

## 🌟 Tính Năng Nổi Bật

1. **Hiển thị 27+ Lời Chúc từ File Excel**: Tự động parse và hiển thị toàn bộ lời chúc của Nomnoms & fan club từ file `Minigame Sinh Nhật P'Jim (Responses).xlsx`.
2. **Ảnh Nền Lấp Lánh Lung Linh**: Sử dụng bức ảnh nền xanh lá ngàn sao lung linh kèm hiệu ứng đom đóm lấp lánh & glassmorphism.
3. **6+ Phong Cách Thiết Kế Thẻ Lưu Niệm Khác Biệt (Không đồng nhất)**:
   - *Polaroid Scrapbook* (Băng dính sticker, font chữ viết tay).
   - *Glassmorphism Gold/Emerald* (Khung kính mờ sang trọng, viền dạ quang).
   - *Vintage Postcard & Stamp* (Con dấu bưu điện retro, chất giấy cổ điển).
   - *Cinematic Film Strip* (Dải phim điện ảnh độc đáo).
   - *Pastel Ribbon Note* (Sổ nốt màu pastel dễ thương).
   - *Doctor Gentleman Badge* (Huy hiệu bác sĩ sang trọng).
4. **Bộ Sưu Tập Ảnh P'Jim**: Tích hợp các hình ảnh của P'Jim vào từng thẻ lưu bút. Cho phép cập nhật/dán link ảnh trực tiếp ngay trên giao diện web.
5. **Chế Độ Lật Sách (Flipbook) & Lưới (Grid View)**: Trải nghiệm lật từng trang lưu bút hoặc xem toàn bộ 27+ trang dạng lưới mosaic.
6. **Thả Tim Tương Tác**: Hiệu ứng nổ pháo hoa trái tim khi người hâm mộ bấm thả tim cho các lời chúc.
7. **Gửi Lời Chúc Mới Realtime**: Form trực tuyến cho phép bất kỳ fan nào truy cập web gửi thêm lời chúc mới.

---

## 🚀 Hướng Dẫn Chạy Tại Máy (Local)

1. Mở Terminal / PowerShell tại thư mục dự án:
   ```bash
   cd c:\Users\Admin\Downloads\mini
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Khởi chạy server:
   ```bash
   node server.js
   ```
4. Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Hướng Dẫn Deploy Lên Render.com (Miễn Phí 100%)

### Cách 1: Deploy qua GitHub (Khuyên dùng - 2 phút)

1. **Đẩy mã nguồn lên GitHub**:
   - Tạo một repository mới trên GitHub (ví dụ: `jimmy-32nd-birthday`).
   - Mở terminal trong thư mục dự án và chạy các lệnh:
     ```bash
     git init
     git add .
     git commit -m "Initial commit for Jimmy 32nd Birthday Memory Book"
     git branch -M main
     git remote add origin https://github.com/TÊN_GITHUB_CỦA_BẠN/jimmy-32nd-birthday.git
     git push -u origin main
     ```

2. **Deploy trên Render.com**:
   - Truy cập [https://dashboard.render.com](https://dashboard.render.com) và đăng nhập bằng tài khoản GitHub.
   - Nhấp vào nút **New +** -> Chọn **Web Service** (hoặc Blueprint).
   - Chọn repository `jimmy-32nd-birthday` vừa đẩy lên.
   - Render sẽ tự động nhận diện file `render.yaml` & `package.json`:
     - **Name**: `jimmy-32nd-birthday`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
   - Nhấp **Create Web Service**.
   - Chờ khoảng 1-2 phút, Render sẽ cấp cho bạn đường link công khai dạng: `https://jimmy-32nd-birthday.onrender.com` ✨

---

## 📸 Cách Thêm / Thay Đổi Link Ảnh P'Jim

1. Trực tiếp trên giao diện web: Nhấp vào nút **"Dán Link Ảnh"** ở góc trên cùng bên phải.
2. Dán các đường link ảnh của P'Jim (mỗi link trên 1 dòng) và bấm **Lưu**.
3. Hệ thống sẽ tự động phân bổ và hiển thị luân phiên hình ảnh của P'Jim trên các trang lưu bút!
