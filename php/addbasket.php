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
    $positionName = $_POST["positionName"];
    if (isset($_COOKIE['phone'])) {
        $phone = $_COOKIE['phone'];
        $query = "SELECT `id` FROM `users` WHERE phone = '$phone'";
        $result = mysqli_query($connection, $query);
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            if ($row) {
                $userid = $row['id'];
                $query = "INSERT INTO usersbaskets (user_id, product_name, quantity, price, status) VALUES ('$userid', '$positionName', 1, 4, 1)";
                $result = mysqli_query($connection, $query);
                if ($result) {
                    echo "success";
                }
                else {
                    echo "fail";
                }
            }
        }
    }
}
mysqli_close($connection);
