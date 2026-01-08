<?php
// 1. Gọi file db.php để kết nối Database (đã có SSL)
require 'db.php';

// 2. Nhận dữ liệu JSON từ React gửi lên
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra nếu không có dữ liệu
if (!$data) {
    echo json_encode(["success" => false, "message" => "Không nhận được dữ liệu từ Frontend"]);
    exit();
}

// 3. Lấy các thông tin từ form (Dựa theo ảnh bạn gửi)
// Lưu ý: Các tên biến bên phải ($data['...']) phải khớp với frontend gửi lên
$title       = isset($data['title']) ? $data['title'] : 'Khóa học mới';
$teacher_name = isset($data['teacher']) ? $data['teacher'] : 'Giảng viên'; // Frontend có thể gửi key là 'teacher' hoặc 'teacher_name'
$price       = isset($data['price']) ? (int)$data['price'] : 0;
$level       = isset($data['level']) ? $data['level'] : 'cap1';
$video       = isset($data['video']) ? $data['video'] : '';

// Ảnh và mô tả (Tạm thời để mặc định vì form thêm nhanh chưa có)
$image       = "https://files.fullstack.edu.vn/f8-prod/courses/7.png"; 
$description = "Mô tả khóa học đang cập nhật...";

// 4. Thực hiện thêm vào Database (Sử dụng Prepared Statement cho an toàn)
$sql = "INSERT INTO courses (title, teacher_name, price, level, video, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    // s = string (chuỗi), i = integer (số)
    // Thứ tự: title, teacher, price, level, video, image, description
    $stmt->bind_param("ssissss", $title, $teacher_name, $price, $level, $video, $image, $description);

    if ($stmt->execute()) {
        // Lấy ID của khóa học vừa tạo để trả về (nếu cần)
        $new_id = $conn->insert_id;
        echo json_encode([
            "success" => true, 
            "message" => "Thêm khóa học thành công!",
            "id" => $new_id
        ]);
    } else {
        echo json_encode([
            "success" => false, 
            "message" => "Lỗi lưu Database: " . $stmt->error
        ]);
    }
    $stmt->close();
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Lỗi chuẩn bị SQL: " . $conn->error
    ]);
}
?>