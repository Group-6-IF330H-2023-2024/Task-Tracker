<?php
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$namaDpn = $data['firstName'];
$namaBlkng = $data['lastName'];

if (isset($data['username'])) {
    require_once './dbconnection.php';
    $q = "INSERT INTO user (username, email, password, nama_depan, nama_belakang) VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $q);
    mysqli_stmt_bind_param($stmt, 'sssss', $username, $email, $password, $namaDpn, $namaBlkng);
    $q2 = "SELECT * FROM user WHERE username = ? OR email = ?";
    $stmt2 = mysqli_prepare($conn, $q2);
    mysqli_stmt_bind_param($stmt2, 'ss', $username, $email);
    mysqli_stmt_execute($stmt2);
    $result = mysqli_stmt_get_result($stmt2);
    $row = mysqli_fetch_assoc($result);
    if ($row) {
        echo "username or email is already registered";
    } else {
        mysqli_stmt_execute($stmt);
        echo "berhasil";
    }
}
