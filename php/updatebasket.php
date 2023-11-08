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
    $query = "SELECT * FROM usersbaskets WHERE user_id = '$id' AND status = 1";
    $result = mysqli_query($connection, $query);
    if ($result) {
        $userBaskets = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $userBaskets[] = $row;
        }
        echo json_encode($userBaskets);
    }
}
mysqli_close($connection);