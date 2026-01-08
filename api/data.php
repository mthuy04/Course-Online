<?php
// 1. Gọi file db.php ngay dòng đầu tiên
// File db.php sẽ tự động lo phần "Mở cửa" (CORS) và kết nối Database
require 'db.php'; 

// 2. Báo cho trình duyệt biết đây là dữ liệu JSON
header("Content-Type: application/json; charset=UTF-8");

// 3. Lấy dữ liệu khóa học
$sql = "SELECT * FROM courses";
$result = $conn->query($sql);

$courses = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

// 4. Trả về kết quả
echo json_encode($courses);
?>