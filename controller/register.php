<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once "../config/dbconnection.php";

$data = json_decode(file_get_contents("php://input"));

$firstName = $data->firstName;
$lastName = $data->lastName;
$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_BCRYPT);

$sql = "INSERT INTO user (nama_depan, nama_belakang, username, email, password) 
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $firstName, $lastName, $username, $email, $password);
$stmt->execute();

echo "berhasil";
