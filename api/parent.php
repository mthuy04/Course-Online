<?php
require 'db.php';
$pid = $_GET['parent_id'];
$child = $conn->query("SELECT u.* FROM users u JOIN parent_child pc ON u.id = pc.student_id WHERE pc.parent_id = $pid")->fetch_assoc();
if($child) {
    $prog = [];
    $res = $conn->query("SELECT c.title as c_name, l.title as l_name, lp.score FROM learning_progress lp JOIN lessons l ON lp.lesson_id=l.id JOIN courses c ON l.course_id=c.id WHERE lp.user_id=".$child['id']);
    while($r = $res->fetch_assoc()) $prog[] = $r;
    echo json_encode(["has_child"=>true, "child"=>$child, "progress"=>$prog]);
} else echo json_encode(["has_child"=>false]);
?>