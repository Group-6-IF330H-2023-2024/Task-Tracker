<?php
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

$id = $data['id'];
if (isset($data['deskripsi'])) {
    $deskripsi = $data['deskripsi'];
} else {
    $deskripsi = NULL;
}
$judul = $data['judul'];

require_once './dbconnection.php';
$q = "UPDATE task SET judul = ?, deskripsi = ? WHERE id = ?";
$stmt = mysqli_prepare($conn, $q);

mysqli_stmt_bind_param($stmt, 'ssi', $judul, $deskripsi, $id);
mysqli_stmt_execute($stmt);
