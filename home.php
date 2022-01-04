<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->
    <section class="main_body">
        <!-- ===== TeleNode Content Dynamically Updated ===== -->
        <div class="main_content">
        </div>
        <?php include "footer.php" ?>
    </section>
    <script>
        let hash = document.location.hash;
        renderPage(hash);

        $(window).on('hashchange', function(e) {
            hash = document.location.hash;
            renderPage(hash);
        });

        function renderPage(hash) {
            if (hash == "") {
                $(".sidebar_items").removeClass("sidebar_items_selected")
                $(".sidebar_items").eq(0).addClass("sidebar_items_selected");
            } else {
                $(".sidebar_items").removeClass("sidebar_items_selected")
                $(".sidebar_items").each(function() {
                    if ($(this).attr("href").includes(hash)) {
                        $(this).addClass("sidebar_items_selected");
                        // console.log(hash);
                    }
                })
            }
            if (hash == '#projects') {
                // ===== IF PROJECTS TAB =====
                // console.log('projects');
                $(".main_content").html(`<?php include "projects.php"; ?>`)

            } else
            if (hash == '#community') {
                // ===== IF COMMUNITY TAB =====
                // console.log('community');
                $(".main_content").html(`<?php include "community.php"; ?>`)
            } else
            if (hash == '#help') {
                // ===== IF HELP TAB =====
                // console.log('help');
                $(".main_content").html(`<?php include "help.php"; ?>`)
            } else {
                // Show Dashboard if none of other menu options
                // console.log('dashboard');
                $(".main_content").html(`<?php include "dashboard.php"; ?>`)
            }
        }
    </script>
</body>

</html>

<!-- Testing Script -->
<script>
</script>