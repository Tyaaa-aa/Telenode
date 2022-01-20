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
    // Check dark mode status
    if ($getUserTheme == "dark") {
        $checkedStatus = "checked";
    } else {
        $checkedStatus = "";
    }

    // Check font size status
    if ($getUserFontsize == '0.6') {
        $fontSizeStatus = "1";
    } else if ($getUserFontsize == '0.8') {
        $fontSizeStatus = "2";
    } else if ($getUserFontsize == '1') {
        $fontSizeStatus = "3";
    } else if ($getUserFontsize == '1.2') {
        $fontSizeStatus = "4";
    } else if ($getUserFontsize == '1.4') {
        $fontSizeStatus = "5";
    } else {
        $fontSizeStatus = '3';
    }

    // if ($row['fontsize'] == 'smaller') {
    //     $fontSizeStatus = "1";
    // } else if ($row['fontsize'] == 'small') {
    //     $fontSizeStatus = "2";
    // } else if ($row['fontsize'] == 'normal') {
    //     $fontSizeStatus = "3";
    // } else if ($row['fontsize'] == 'big') {
    //     $fontSizeStatus = "4";
    // } else if ($row['fontsize'] == 'bigger') {
    //     $fontSizeStatus = "5";
    // } else {
    //     $fontSizeStatus = '1';
    // }
?>

    <body>
        <!-- HEADER CONTENT -->
        <?php include "header.php"; ?>
        <!-- BODY CONTENT BELOW -->

        <section class="main_body">
            <div class="main_content">
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
                            <input type="checkbox" id="toggleAll" name="theme" <?= $checkedStatus ?>>
                            <label for="toggleAll"></label>
                        </div>
                    </div>

                    <div class="font_slider_container">
                        <p>Font Size: <span class="font_size_status"><?= $userFontSize ?></span> </p>
                        <input type="range" min="1" max="5" value="<?= $fontSizeStatus ?>" class="font_slider slider" id="myRange">
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

    function updateFontSize(fontsize) {
        // console.log(fontsize)
        $.ajax({
            type: "POST",
            data: 'fontsize=' + fontsize,
            url: "update_fontsize_backend.php",
            // cache: false,
            success: function(response) {
                let fontsize = JSON.parse(response).fontsize
                // console.log(fontsize)
            }
        })
    }
</script>



<?php
}
