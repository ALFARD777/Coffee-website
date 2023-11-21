<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$query = "SELECT * FROM `call_requests`";
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
    }
}
