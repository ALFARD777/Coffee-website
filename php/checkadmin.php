<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
if (isset($_COOKIE['phone'])) {
    $phone = $_COOKIE['phone'];
    $query = "SELECT isAdmin FROM `users` WHERE phone = '$phone'";
    $result = mysqli_query($connection, $query);
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        if ($row) {
            $isAdmin = $row['isAdmin'];
            echo $isAdmin;
        }
    }
}
mysqli_close($connection);