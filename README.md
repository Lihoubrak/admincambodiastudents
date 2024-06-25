## Cách mở ứng dụng
Ứng dụng của em được triển khai và thử nghiệm trên localhost. Dưới đây là hướng dẫn chi tiết về cách mở và chạy ứng dụng:

### Frontend (Giao diện người dùng)
#### Web
1. Cài đặt các thư viện cần thiết bằng cách chạy lệnh `npm install` trong thư mục dự án ReactJS.
2. Cấu hình Firebase Firestore bằng cách tạo tệp `.env` và thêm các biến môi trường liên quan đến Firebase:
    ```plaintext
    VITE__FIREBASE_API_KEY=your_api_key
    VITE__FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE__FIREBASE_PROJECT_ID=your_project_id
    VITE__FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE__FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender
    VITE__FIREBASE_APP_ID=your_app_id
    ```
3. Sau khi cài đặt và cấu hình xong, chạy lệnh `npm run dev` để khởi động ứng dụng trên localhost.
4. Mở trình duyệt và truy cập vào địa chỉ `http://localhost:5173` để xem giao diện web của ứng dụng.
