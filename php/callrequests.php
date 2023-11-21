<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$query = "SELECT `name`, `email`, `phone`, `additional` FROM `call_requests` WHERE status = 1";
$result = mysqli_query($connection, $query);
if (mysqli_num_rows($result) == 0 && !$result) {
    echo "NULL";
} else {
    if ($result) {
        $data = array();
        while ($row = mysqli_fetch_array($result)) {
            $data[] = $row;
        }
        echo json_encode($data);
        mysqli_query($connection, "UPDATE `call_requests` SET status = 0");
    }
}
