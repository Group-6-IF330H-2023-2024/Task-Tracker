<?php
session_start();
require_once './header.php';
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $raw_data = file_get_contents("php://input");
    $data = json_decode($raw_data, associative: true);

    $username = $data['username'];
    $password = $data['password'];

    require_once './dbconnection.php';
    $q = "SELECT * FROM user WHERE username = ?";
    $stmt = mysqli_prepare($conn, $q);
    mysqli_stmt_bind_param($stmt, 's', $username);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            $_SESSION['username'] = $username;
            $_SESSION['id'] = $row['id'];
            echo 'berhasil';
        } else {
            echo "Password salah";
        }
    } else {
        echo "Username tidak ditemukan";
    }
} else {
    if (isset($_SESSION['username'])) {
        echo "sudah login";
    } else {
        echo "belum login";
    }
}
