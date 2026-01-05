<?php
require 'db.php';
$d = json_decode(file_get_contents("php://input"), true);
$stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount) VALUES (?, ?)");
$stmt->bind_param("id", $d['user_id'], $d['total']);
echo json_encode(["success" => $stmt->execute()]);
?>