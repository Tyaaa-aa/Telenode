<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php";
    function url_origin($s, $use_forwarded_host = false)
    {
        $ssl      = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on');
        $sp       = strtolower($s['SERVER_PROTOCOL']);
        $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
        $port     = $s['SERVER_PORT'];
        $port     = ((!$ssl && $port == '80') || ($ssl && $port == '443')) ? '' : ':' . $port;
        $host     = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST'])) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
        $host     = isset($host) ? $host : $s['SERVER_NAME'] . $port;
        return $protocol . '://' . $host;
    }

    function full_url($s, $use_forwarded_host = false)
    {
        return url_origin($s, $use_forwarded_host) . $s['REQUEST_URI'];
    }
    function strip_after_string($str, $char)
    {
        $pos = strpos($str, $char);
        if ($pos !== false) {
            //$char was found, so return everything up to it.
            return substr($str, 0, $pos);
        } else {
            //this will return the original string if $char is not found.  if you wish to return a blank string when not found, just change $str to ''
            return $str;
        }
    }
    $absolute_url = full_url($_SERVER);
    $rootURL = strip_after_string($absolute_url, "home");
    // $absolute_url = str_replace("edit", "watch", $absolute_url);

    ?>
    <!-- BODY CONTENT BELOW -->
    <section class="main_body">
        <!-- ===== TeleNode Content Dynamically Updated ===== -->
        <div class="help_resources"></div>
        <div class="main_content">
        </div>
        <?php include "footer.php" ?>
    </section>
    <script>
        let hash = document.location.hash
        renderPage(hash)

        $(window).on('hashchange', function(e) {
            hash = document.location.hash
            renderPage(hash)
        })

        function renderPage(hash) {
            // console.log(hash)
            $(".onboarding_content").remove()
            $(".vjs-styles-defaults").remove()
            $(".vjs-styles-dimensions").remove()
            if (hash == "") {
                $(".sidebar_items").removeClass("sidebar_items_selected")
                $(".sidebar_items").eq(0).addClass("sidebar_items_selected")
            } else {
                $(".sidebar_items").removeClass("sidebar_items_selected")
                $(".sidebar_items").each(function() {
                    if ($(this).attr("href").includes(hash)) {
                        $(this).addClass("sidebar_items_selected")
                        // console.log(hash);
                    }
                })
            }
            if (hash == '#projects') {
                // ===== IF PROJECTS TAB =====
                // console.log('projects')
                $(".main_content").html(`<?php include "projects.php"; ?>`)

            } else
            if (hash == '#community') {
                // ===== IF COMMUNITY TAB =====
                // console.log('community')
                $(".main_content").html(`<?php include "community.php"; ?>`)
            } else
            if (hash == '#help') {
                // ===== IF HELP TAB =====
                // console.log('help')
                let s = document.createElement('script')
                s.setAttribute('src', "https://vjs.zencdn.net/7.17.0/video.min.js")
                s.setAttribute('class', "onboarding_content")
                document.head.appendChild(s)
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