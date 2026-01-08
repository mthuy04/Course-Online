<?php
// --- CẤU HÌNH CORS (Để Frontend gọi được API) ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// Xử lý request OPTIONS (Preflight) để không bị lỗi đỏ trên trình duyệt
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- KẾT NỐI DATABASE (Tự động chuyển đổi Local/Cloud) ---
// Nếu tìm thấy biến môi trường từ Render thì dùng, không thì dùng localhost
$host = getenv('DB_HOST') ? getenv('DB_HOST') : "127.0.0.1";
$user = getenv('DB_USER') ? getenv('DB_USER') : "root";
$pass = getenv('DB_PASS') ? getenv('DB_PASS') : "";
$db   = getenv('DB_NAME') ? getenv('DB_NAME') : "web_khoa_hoc";
$port = getenv('DB_PORT') ? (int)getenv('DB_PORT') : 3306;

$conn = new mysqli($host, $user, $pass, $db, $port);
$conn->set_charset("utf8");

// Kiểm tra lỗi kết nối
if ($conn->connect_error) {
    // Trả về JSON để Frontend hiển thị lỗi đẹp hơn
    echo json_encode(["success" => false, "message" => "Lỗi kết nối DB: " . $conn->connect_error]);
    exit();
}
?>