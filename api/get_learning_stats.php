<?php
require 'db.php';
// Nhận user_id từ request (Nếu không có thì mặc định là 1)
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 1;

// 1. Tính tổng số bài đã học
$sql_count = "SELECT COUNT(*) as total_lessons FROM learning_progress WHERE user_id = $user_id AND status = 'completed'";
$res_count = $conn->query($sql_count);
$count = $res_count ? $res_count->fetch_assoc()['total_lessons'] : 0;

// 2. Tính điểm trung bình (chỉ tính các bài có điểm > 0)
$sql_score = "SELECT AVG(score) as avg_score FROM learning_progress WHERE user_id = $user_id AND score > 0";
$res_score = $conn->query($sql_score);
$avg = $res_score ? $res_score->fetch_assoc()['avg_score'] : 0;

// 3. Ước lượng giờ học (Giả sử mỗi bài học trung bình 30 phút = 0.5 giờ)
$hours = $count * 0.5;

echo json_encode([
    "completed_lessons" => (int)$count,
    "avg_score" => round((float)$avg, 1),
    "hours_learned" => $hours
]);
?>