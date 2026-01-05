<?php
require 'db.php';
$d = json_decode(file_get_contents("php://input"), true);

// Nhận thêm trường 'video'
$stmt = $conn->prepare("INSERT INTO courses (title, price, image, video, level, teacher_name, description, duration) VALUES (?, ?, ?, ?, ?, ?, ?, '20 bài')");
$stmt->bind_param("sisssss", $d['title'], $d['price'], $d['image'], $d['video'], $d['level'], $d['teacher_name'], $d['description']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "id" => $conn->insert_id]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>