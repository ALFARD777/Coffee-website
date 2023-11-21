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
$email = $_POST['email'];
$phone = $_POST['phone'];
$additional = $_POST['additional'];
$query = "INSERT INTO call_requests (name, email, phone, additional, status) VALUES ('$name', '$email', '$phone', '$additional', 1);";
$result = mysqli_query($connection, $query);
if ($result) {
    if ($result) {
        header("Location: /Coffee/notifications/success.html");
    }
    else {
        header("Location: /Coffee/notifications/fail.html");
    }
} else {
    header("Location: /Coffee/notifications/fail.html");
}
mysqli_close($connection);