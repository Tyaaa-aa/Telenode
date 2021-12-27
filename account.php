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
                <form class="account_form" action="account_backend.php" method="POST">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Username" class="input_field readonly_field" name="username" id="username" value="<?= $getUserName ?>" minlength="3" required readonly>

                    <label for="email">E-Mail</label>
                    <input type="email" placeholder="E-Mail" class="input_field readonly_field" name="email" id="email" value="<?= $getUserEmail ?>" required readonly>

                    <div class="account_password">
                        <label for="password">Password</label>
                        <input type="password" placeholder="********" class="input_field readonly_field" name="password" id="password" required readonly>
                    </div>

                </form>
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
            data: 'theme=' + theme, // <-- put on top
            url: "updateTheme_backend.php",
            cache: false,
            success: function(response) {
                let theme = JSON.parse(response).theme
                // console.log(theme)
                let style;
                if (theme == "dark") {
                    style = `<?php include "styles_dark.php" ?>`
                } else {
                    style = `<?php include "styles_default.php" ?>`
                }

                $("head").find("#theme").remove()
                $("head").append(style)

                // alert("Record successfully updated")
            }
        })
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var filepath = e.target.result
                // $('#blah').attr('src', e.target.result);
                $(".account_pic").css("background", "url(" + filepath + ")")
            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    $("#upload-img").change(function() {
        // readURL(this);
        $(".account_pic").submit()
    });
</script>



<?php
}
