<?php
require 'db.php'; // Gọi file kết nối ở trên

// Đọc dữ liệu JSON gửi từ React
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra hành động login
if (isset($data['action']) && $data['action'] === 'login') {
    $u = $data['username'];
    $p = $data['password'];

    // Dùng Prepare Statement để tránh lỗi SQL Injection và lỗi ký tự lạ
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $u, $p);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Đăng nhập thành công
        echo json_encode([
            "success" => true, 
            "message" => "Đăng nhập thành công!",
            "user" => $row
        ]);
    } else {
        // Sai tài khoản hoặc mật khẩu
        echo json_encode([
            "success" => false, 
            "message" => "Sai tài khoản hoặc mật khẩu! (Thử: student/123)"
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Không nhận được dữ liệu login"]);
}
?>