<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'coffee';
$connection = mysqli_connect($host, $username, $password, $database);
if (!$connection) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $productName = $_POST["productName"];
    $id = $_POST["id"];
    $query = "DELETE FROM usersbaskets WHERE product_name = '$productName' AND status = 1 AND user_id = '$id' LIMIT 1";
    $result = mysqli_query($connection, $query);
    if ($result) {
        echo "success";
    } else {
        echo "fail";
    }
}
mysqli_close($connection);
