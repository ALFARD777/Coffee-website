<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$name = $_POST['name'];
$phone = $_POST['phone'];
$password = $_POST['password'];
$query = "SELECT `name` FROM `users` WHERE `phone` = '$phone'";
$result = mysqli_query($connection, $query);
if ($result && mysqli_num_rows($result) != 0) {
    header("Location: /Coffee/notifications/incorrectnum.html");
} else {
    $query = "INSERT INTO users (name, phone, password, isAdmin) VALUES ('$name', '$phone', '$password', '0')";
    $result = mysqli_query($connection, $query);
    if ($result) {
        $phone = mb_convert_encoding($phone, 'UTF-8');
        setcookie("phone", $phone, time() + (3600 * 3), "/");
        header("Location: /Coffee/notifications/success.html");
    } else {
        header("Location: /Coffee/notifications/fail.html");
    }
}
mysqli_close($connection);