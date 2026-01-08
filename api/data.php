<?php
// --- BẮT BUỘC: CHO PHÉP REACT VƯỢT QUA CỬA NGROK ---
header("Access-Control-Allow-Origin: *");
// Dòng dưới là chìa khóa quan trọng nhất:
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, ngrok-skip-browser-warning");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Xử lý request kiểm tra của trình duyệt
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

require 'db.php'; 

$sql = "SELECT * FROM courses";
$result = $conn->query($sql);

$courses = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

echo json_encode($courses);
$conn->close();
?>