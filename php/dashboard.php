<?php
session_start();
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

if (isset($_SESSION['username'])) {

    require_once './dbconnection.php';
    $id_user = $_SESSION['id'];

    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $q = "SELECT *, 
                (SELECT COUNT(*) FROM task WHERE status = 'Done' AND id_user = ?) AS DONE,
                (SELECT COUNT(*) FROM task WHERE status = 'In Progress' AND id_user = ?) AS INPROGRESS,
                (SELECT COUNT(*) FROM task WHERE status = 'Not Started Yet' AND id_user = ?) AS NOTSTART
                FROM task WHERE id_user = ? ORDER BY status DESC;";
        $stmt = mysqli_prepare($conn, $q);

        mysqli_stmt_bind_param($stmt, 'iiii', $id_user, $id_user, $id_user, $id_user);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        $hasil = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $hasil[] = $row;
        }

        echo json_encode($hasil);
    } else {
        if (isset($data['deskripsi'])) {
            $deskripsi = $data['deskripsi'];
        } else {
            $deskripsi = NULL;
        }
        $judul = $data['judul'];
        $status = "Not Started Yet";
        $done = 0;

        $qAdd = "INSERT INTO task (id_user, judul, deskripsi, status, done) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $qAdd);

        mysqli_stmt_bind_param($stmt, 'isssi', $id_user, $judul, $deskripsi, $status, $done);
        mysqli_stmt_execute($stmt);
        echo "add data berhasil";
    }
} else echo "belum login";
