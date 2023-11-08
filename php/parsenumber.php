<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$id = $_POST['id'];
$query = "SELECT * FROM users WHERE id = '$id'";
$result = mysqli_query($connection, $query);
if ($result) {
    $row = mysqli_fetch_assoc($result);
        if ($row) {
            $name = $row['name'];
            $phone = $row['phone'];
            echo json_encode(array(
                'name' => $name,
                'phone' => $phone
            ));
        }
}
mysqli_close($connection);
