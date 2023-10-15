<?php

require_once '../config/dbconnection.php';

if (isset($_POST['edit_task'])) {
    $task_id = $_POST['task_id'];
    $new_title = $_POST['new_title'];
    $new_description = $_POST['new_description'];

    $sql = "UPDATE task SET judul = ?, deskripsi = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $new_title, $new_description, $task_id);
    
    if ($stmt->execute()) {
        echo "Task updated successfully!";
    } else {
        echo "Error updating task: " . $conn->error;
    }
}
