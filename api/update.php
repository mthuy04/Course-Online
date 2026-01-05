<?php
require 'db.php';
$d = json_decode(file_get_contents("php://input"), true);

// Nhận thêm trường 'video' để update
$stmt = $conn->prepare("UPDATE courses SET title=?, price=?, image=?, video=?, level=?, teacher_name=?, description=? WHERE id=?");
$stmt->bind_param("sisssssi", $d['title'], $d['price'], $d['image'], $d['video'], $d['level'], $d['teacher_name'], $d['description'], $d['id']);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>