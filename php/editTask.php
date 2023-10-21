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
$tanggal = $data['tanggal'];
$judul = $data['judul'];

require_once './dbconnection.php';
$q = "UPDATE task SET judul = ?, deskripsi = ?, tanggal = ? WHERE id = ?";
$stmt = mysqli_prepare($conn, $q);

mysqli_stmt_bind_param($stmt, 'sssi', $judul, $deskripsi, $tanggal, $id);
mysqli_stmt_execute($stmt);
