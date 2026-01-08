<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) { echo json_encode(["success"=>false]); exit(); }

$title = $data['title'];
$price = (int)$data['price'];
$level = $data['level'];
$image = $data['image'];
$video = $data['video'];
$desc  = $data['description'];
// NHẬN THÊM TEACHER_ID
$teacher_id = isset($data['teacher_id']) ? $data['teacher_id'] : 0; 
$teacher_name = $data['teacher_name'];

$sql = "INSERT INTO courses (title, teacher_id, teacher_name, price, level, video, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sisissss", $title, $teacher_id, $teacher_name, $price, $level, $video, $image, $desc);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "id" => $conn->insert_id]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}
?>