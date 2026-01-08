<?php
require 'db.php';

// Lấy ID khóa học từ tham số truyền lên
$course_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($course_id == 0) {
    echo json_encode([]);
    exit();
}

// Lấy danh sách bài học của khóa đó
$sql = "SELECT * FROM lessons WHERE course_id = $course_id ORDER BY id ASC";
$result = $conn->query($sql);

$lessons = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $lessons[] = $row;
    }
}

// Trả về JSON
echo json_encode($lessons);
?>