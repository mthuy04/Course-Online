<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$conn = new mysqli("127.0.0.1", "root", "", "web_khoa_hoc"); // <--- Check kỹ dòng này
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die(json_encode(["success"=>false, "message"=>"Lỗi DB: ".$conn->connect_error]));
}
?>