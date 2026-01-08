<?php
require 'db.php';

// Lấy Top 5 người điểm cao nhất
$sql = "SELECT full_name, xp, avatar FROM users ORDER BY xp DESC LIMIT 5";
$result = $conn->query($sql);

$leaderboard = [];
$rank = 1;

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Thêm trường 'rank' để frontend dễ hiển thị
        $row['rank'] = $rank++;
        // Nếu chưa có avatar thì dùng avatar mặc định
        if (!$row['avatar']) {
            $nameEncoded = urlencode($row['full_name']);
            $row['avatar'] = "https://ui-avatars.com/api/?name=$nameEncoded&background=random";
        }
        $leaderboard[] = $row;
    }
}

echo json_encode($leaderboard);
?>