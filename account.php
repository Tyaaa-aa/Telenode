<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php";
if (!isset($_SESSION["userID"])) {
    echo "NOT LOGGED IN";
?>
    <script type='text/javascript'>
        window.location = 'login.php';
    </script>
<?php
} else {
?>

    <body>
        <!-- HEADER CONTENT -->
        <?php include "header.php"; ?>
        <!-- BODY CONTENT BELOW -->

        <section class="main_body">
            <div class="main_content">
                <!-- <?=
                        $getUserID . "<br>" .
                            $getUserEmail . "<br>" .
                            $getUserName . "<br>" .
                            $getProfileImg . "<br>" .
                            $getUserTheme . "<br><br><br>";
                        ?> -->
                <form class="account_pic" action="update_profilepic.php" method="POST" enctype="multipart/form-data">
                    <input type="file" class="upload_prompt" id="upload-img" name="fileUpload" required accept="image/png, image/jpeg" title="Edit Profile Picture">
                    <i class="material-icons">
                        photo_camera
                    </i>

                </form>
                <form class="account_form" action="update_account_backend.php" method="POST">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Username" class="input_field readonly_field" name="username" id="username" value="<?= $getUserName ?>" minlength="3" required readonly>

                    <label for="email">E-Mail</label>
                    <input type="email" placeholder="E-Mail" class="input_field readonly_field" name="email" id="email" value="<?= $getUserEmail ?>" required readonly>

                    <div class="account_password">
                        <label for="password">Password</label>
                        <input type="password" placeholder="********" class="input_field readonly_field" name="password" id="password" required readonly minlength="8">
                    </div>

                    <div class="dark_mode_label">
                    <span>Dark Mode: </span>
                    <div class="switch">
                        <input type="checkbox" id="toggleAll" name="theme" <?php
                                                                            if ($getUserTheme == "dark") {
                                                                                echo "checked";
                                                                            }
                                                                            ?>>
                        <label for="toggleAll"></label>
                    </div>
                </div>
                <button type="button" class="edit_account_btn btn">Edit</button>
                </form>

            </div>
            <?php include "footer.php" ?>
        </section>


    </body>

</html>

<style>
    .account_pic {
        background-image: url(<?= $getProfileImg ?>);
    }
</style>
<script>
    // Collapse sidebar onload for cleaner User Experience
    // collapseSidebar()


    function updateTheme(theme) {
        jQuery.ajax({
            type: "POST",
            data: 'theme=' + theme,
            url: "updateTheme_backend.php",
            cache: false,
            success: function(response) {
                let theme = JSON.parse(response).theme
                let style;
                if (theme == "dark") {
                    style = `<?php include "themes/theme_dark.php" ?>`
                } else {
                    style = `<?php include "themes/theme_default.php" ?>`
                }
                $("head").find("#theme").remove()
                $("head").append(style)
            }
        })
    }
</script>



<?php
}
