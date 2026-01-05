<?php
require 'db.php';
$res = $conn->query("SELECT * FROM courses");
$courses = [];
while($row = $res->fetch_assoc()) $courses[] = $row;
echo json_encode($courses);
?>