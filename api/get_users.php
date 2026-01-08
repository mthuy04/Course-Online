<?php
// 1. Gọi file kết nối Database
require 'db.php';

// 2. Viết câu lệnh SQL lấy danh sách user
// Sắp xếp người mới nhất lên đầu (ORDER BY id DESC)
$sql = "SELECT id, full_name, email, role, status, DATE_FORMAT(created_at, '%d/%m/%Y') as joined 
        FROM users 
        ORDER BY id DESC";

$result = $conn->query($sql);

$users = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Nếu user chưa có tên, hiển thị tạm username
        if (empty($row['full_name'])) {
            $row['full_name'] = "Người dùng ẩn danh"; 
        }
        $users[] = $row;
    }
}

// 3. Trả về JSON cho React
echo json_encode($users);
?>