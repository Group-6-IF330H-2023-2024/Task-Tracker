<?php
session_start();
require_once './header.php';

require_once './dbconnection.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

$id = $data['id'];
$status = $data['status'];

if ($status === "Not Started Yet") $done = 0;
if ($status === "In Progress") $done = 0;
if ($status === "Done") $done = 1;

$q = "UPDATE task SET status = ?, done = ? WHERE id = ?";
$stmt = mysqli_prepare($conn, $q);
mysqli_stmt_bind_param($stmt, 'sii', $status, $done, $id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

echo "berhasil";