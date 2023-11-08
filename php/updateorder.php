<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$query = "SELECT * FROM usersbaskets WHERE status = 2";
$result = mysqli_query($connection, $query);
if ($result) {
    $userBaskets = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $userBaskets[] = $row;
    }
    echo json_encode($userBaskets);
}
mysqli_close($connection);
