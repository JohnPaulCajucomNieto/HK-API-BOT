<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "mylogins";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);

    if (empty($email) || empty($password)) {
        echo "Email and password are required.";
    } else {
        $stmt = $conn->prepare("SELECT * FROM admin_login WHERE email = ? AND password = ?");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "<script>alert('Login successful!');</script>";
            header("Location: index.html"); 
            exit(); 
        } else {
            echo "<script>alert('Invalid email or password. Please try again.');</script>";
        }
    }
}

$conn->close();
?>