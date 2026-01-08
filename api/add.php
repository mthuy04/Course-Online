<?php
// ... code insert ...
if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id; // Lấy ID vừa tạo
    echo json_encode(["success" => true, "message" => "Tạo thành công", "id" => $last_id]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi SQL: " . $conn->error]);
}
?>