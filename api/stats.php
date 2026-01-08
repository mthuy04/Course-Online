<?php
require 'db.php';

// 1. Lấy Tổng Thu (IN) từ orders
$sql_in = "SELECT SUM(total_amount) as total FROM orders";
$income = $conn->query($sql_in)->fetch_assoc()['total'] ?? 0;

// 2. Lấy Tổng Chi (OUT) từ expenses (MỚI)
$sql_out = "SELECT SUM(amount) as total FROM expenses";
$expense = $conn->query($sql_out)->fetch_assoc()['total'] ?? 0;

// 3. Giả lập dữ liệu biểu đồ theo tuần (Để vẽ AreaChart)
$chart_data = [
    ["name" => "Tuần 1", "thu" => $income * 0.2, "chi" => $expense * 0.1],
    ["name" => "Tuần 2", "thu" => $income * 0.5, "chi" => $expense * 0.4],
    ["name" => "Tuần 3", "thu" => $income * 0.8, "chi" => $expense * 0.6],
    ["name" => "Hiện tại", "thu" => (int)$income, "chi" => (int)$expense]
];

// 4. Lấy lịch sử giao dịch hỗn hợp (Gộp cả Thu và Chi)
$transactions = [];

// Lấy 5 đơn hàng mới nhất (IN)
$res_in = $conn->query("SELECT id, 'order' as type, total_amount, created_at, 'Học viên' as user_name FROM orders ORDER BY created_at DESC LIMIT 5");
if ($res_in) {
    while($row = $res_in->fetch_assoc()) $transactions[] = $row;
}

// Lấy 5 khoản chi mới nhất (OUT)
$res_out = $conn->query("SELECT id, 'expense' as type, amount as total_amount, created_at, title as user_name FROM expenses ORDER BY created_at DESC LIMIT 5");
if ($res_out) {
    while($row = $res_out->fetch_assoc()) $transactions[] = $row;
}

// Sắp xếp lại theo thời gian mới nhất
usort($transactions, function($a, $b) {
    return strtotime($b['created_at']) - strtotime($a['created_at']);
});

echo json_encode([
    "revenue" => (int)$income,
    "expense" => (int)$expense,
    "users" => (int)$conn->query("SELECT COUNT(*) as c FROM users")->fetch_assoc()['c'],
    "courses" => (int)$conn->query("SELECT COUNT(*) as c FROM courses")->fetch_assoc()['c'],
    "transactions" => array_slice($transactions, 0, 5), // Chỉ lấy 5 giao dịch mới nhất
    "chart_data" => $chart_data
]);
?>