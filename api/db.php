<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = getenv('DB_HOST') ? getenv('DB_HOST') : "127.0.0.1";
$user = getenv('DB_USER') ? getenv('DB_USER') : "root";
$pass = getenv('DB_PASS') ? getenv('DB_PASS') : "";
$db   = getenv('DB_NAME') ? getenv('DB_NAME') : "web_khoa_hoc";
$port = getenv('DB_PORT') ? (int)getenv('DB_PORT') : 3306;

// --- PHẦN QUAN TRỌNG: CẤU HÌNH SSL CHO TIDB ---

// 1. Khởi tạo đối tượng mysqli (chưa kết nối vội)
$conn = mysqli_init();

// 2. Cấu hình SSL (Dùng chứng chỉ mặc định của hệ thống Docker/Server)
// Các tham số NULL nghĩa là: "Hãy dùng chứng chỉ có sẵn trong máy chủ"
$conn->options(MYSQLI_OPT_SSL_VERIFY_SERVER_CERT, true);
$conn->ssl_set(NULL, NULL, NULL, NULL, NULL);

// 3. Thực hiện kết nối an toàn
$conn->real_connect($host, $user, $pass, $db, $port, NULL, MYSQLI_CLIENT_SSL);

// ----------------------------------------------

$conn->set_charset("utf8");

// Kiểm tra lỗi (Lưu ý: dùng connect_errno thay vì connect_error khi dùng real_connect)
if ($conn->connect_errno) {
    echo json_encode(["success" => false, "message" => "Lỗi kết nối DB: " . $conn->connect_error]);
    exit();
}