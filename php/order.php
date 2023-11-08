<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$phone = $_POST['phone'];
$query = "SELECT `id` FROM `users` WHERE phone = '$phone'";
$result = mysqli_query($connection, $query);
if ($result) {
    $user = mysqli_fetch_assoc($result);
    $id = $user['id'];
    $query = "UPDATE usersbaskets SET status = 2 WHERE user_id = '$id'";
    $result = mysqli_query($connection, $query);
    if ($result) {
        echo "success";
    }
    else {
        echo "fail";
    }
}
mysqli_close($connection);