<?php
require 'db.php';
$teacher_id = isset($_GET['teacher_id']) ? $_GET['teacher_id'] : 0;

// Query: Lấy thông tin User (Học sinh) đã mua các Khóa học do Teacher này dạy
$sql = "SELECT DISTINCT u.full_name, u.email, u.avatar, c.title as course_name, e.created_at
        FROM enrollments e
        JOIN users u ON e.user_id = u.id
        JOIN courses c ON e.course_id = c.id
        WHERE c.teacher_id = $teacher_id
        ORDER BY e.created_at DESC";

$result = $conn->query($sql);
$students = [];
while($row = $result->fetch_assoc()) $students[] = $row;

echo json_encode($students);
?>