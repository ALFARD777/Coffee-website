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
$password = $_POST['password'];
$query = "UPDATE `users` SET `password` = '$password' WHERE `phone` = '$phone'";
$result = mysqli_query($connection, $query);
if ($result) {
    header("Location: /Coffee/notifications/success.html");
} else {
    header("Location: /Coffee/notifications/fail.html");
}
mysqli_close($connection);