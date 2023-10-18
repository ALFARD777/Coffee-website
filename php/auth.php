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
$query = "SELECT `name`, `phone`, `password` FROM `users` WHERE `phone` = '$phone'";
$result = mysqli_query($connection, $query);
if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $name = $row['name'];
        $phone = $row['phone'];
        $password = $row['password'];
        setcookie("phone", $phone, time() + (3600 * 3), "/");
        header("Location: /Coffee/notifications/success.html");
    } else {
        header("Location: /Coffee/notifications/incorrectpass.html");
    }
} else {
    header("Location: /Coffee/notifications/fail.html");
}
