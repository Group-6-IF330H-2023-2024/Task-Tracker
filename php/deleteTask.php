<?php
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

$id = $data['id'];

require_once './dbconnection.php';
$q = "DELETE FROM task WHERE id = ?";
$stmt = mysqli_prepare($conn, $q);
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
echo "berhasil";