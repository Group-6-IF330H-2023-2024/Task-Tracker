<?php
session_start();
require_once './header.php';

require_once './dbconnection.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

$id = $data['id'];
$done = $data['done'];

if ($done == 0) {
    $q = "UPDATE task SET status = 'In Progress', done = 0 WHERE id = ?";
    $stmt = mysqli_prepare($conn, $q);
    mysqli_stmt_bind_param($stmt, 's', $id);
    mysqli_stmt_execute($stmt);
} else {
    $q = "UPDATE task SET status = 'Done', done = 1 WHERE id = ?";
    $stmt = mysqli_prepare($conn, $q);
    mysqli_stmt_bind_param($stmt, 's', $id);
    mysqli_stmt_execute($stmt);
}

$result = mysqli_stmt_get_result($stmt);

echo "berhasil";