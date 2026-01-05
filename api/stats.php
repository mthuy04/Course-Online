<?php
require 'db.php';

// 1. Tổng doanh thu (GMV)
$sql_rev = "SELECT SUM(total_amount) as total FROM orders";
$revenue = $conn->query($sql_rev)->fetch_assoc()['total'] ?? 0;

// 2. Tổng User
$users = $conn->query("SELECT COUNT(*) as c FROM users")->fetch_assoc()['c'];

// 3. Tổng Khóa học
$courses = $conn->query("SELECT COUNT(*) as c FROM courses")->fetch_assoc()['c'];

// 4. Lịch sử giao dịch mới nhất (Để hiện bên Admin)
$sql_trans = "SELECT o.id, u.full_name, o.total_amount, o.created_at 
              FROM orders o JOIN users u ON o.user_id = u.id 
              ORDER BY o.created_at DESC LIMIT 5";
$trans_result = $conn->query($sql_trans);
$transactions = [];
while($row = $trans_result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode([
    "revenue" => (int)$revenue,
    "users" => (int)$users,
    "courses" => (int)$courses,
    "transactions" => $transactions
]);
?>