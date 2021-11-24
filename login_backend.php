<?php
if (isset($_POST["userEmail"]) && isset($_POST["userPassword"])) {
    $userEmail = $_POST["userEmail"];
    $userPassword = $_POST["userPassword"];

    include "db_connect.php";


    $stmt = $conn->prepare("SELECT userPassword from tb_users where userEmail=?");
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();

    $stmt->store_result();
    $row = $stmt->num_rows();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    $stmt->close();

    // $sPassword = password_verify($userPassword, $hashed_password);

    if (password_verify($userPassword, $hashed_password)) {
        $id = "NULL";
        include "db_connect.php";
        $stmt = $conn->prepare("SELECT userID, userName from tb_users where userEmail=?");
        $stmt->bind_param("s", $userEmail);
        $stmt->execute();

        $stmt->store_result();
        $row = $stmt->num_rows();
        $stmt->bind_result($id, $userName);
        $stmt->fetch();
        $stmt->close();
        // echo $id;
        if ($row == 0) {
?>
            <script type='text/javascript'>
                alert('Login Failed, Please Try Again or Register an Account First');
                window.location = 'index.php';
            </script>
            <a href="register.php">Click here if you are not redirected automatically within 3 seconds</a>
        <?php
        } else {
            session_start();
            $_SESSION["userID"] = $id;
            $_SESSION["userName"] = $userName;
            $_SESSION["userEmail"] = $userEmail;
            echo "Login Successful.<br><br> $userName<br>$userEmail";

            header("Location: index.php");
        ?>
        <?php
        }
    } else {
        ?>
        <script type='text/javascript'>
            alert('Login failed, Password or E-Mail entered incorrectly please try again');
            window.location = 'login.php';
        </script>
        <a href="login.php">Click here if you are not redirected automatically within 3 seconds</a>
    <?php
    }
} else {
    ?>
    <script type='text/javascript'>
        alert('Something went wrong, please try again');
        window.location = 'login.php';
    </script>
    <a href="login.php">Click here if you are not redirected automatically within 3 seconds</a>
<?php
}









