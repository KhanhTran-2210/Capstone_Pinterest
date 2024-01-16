Capstone Pinterest
Team: Khanh, Lâm

ORM: sequelize, prisma
Connect db hãy chỉnh sửa trong file .env

Tạo các API để thao tác dữ liệu tương ứng các trang phía dưới: + POST trang đăng ký. (Khanh) + POST trang đăng nhập. (Khanh)

- Trang chủ:
  - GET danh sách ảnh về. (Lâm)
  - GET tìm kiếm danh sách ảnh theo tên. (Lâm)
- Trang chi tiết:
  - GET thông tin ảnh và người tạo ảnh bằng id ảnh.(Lâm)
  - GET thông tin bình luận theo id ảnh. (Lâm)
  - GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save). (Lâm)
  - POST để lưu thông tin bình luận của người dùng với hình ảnh. (Khanh)
- Trang quản lý ảnh: + GET thông tin user (Khanh) + GET danh sách ảnh đã lưu theo user id.(Khanh) + GET danh sách ảnh đã tạo theo user id.(Khanh) + DELETE xóa ảnh đã tạo theo id ảnh. (Khanh)
  \*Trang thêm ảnh:
  - POST thêm một ảnh của user. (Khanh)
    \*Chỉnh sửa thông tin cá nhân:
  - PUT thông tin cá nhân của user. (Khanh)
