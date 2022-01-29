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
        <div class="main_content">
            <div class="loading_bar"></div>

            <!-- <h2>Dashboard</h2> -->
            <div id="dashboard-container">
                <?php
                $query = $_GET['q'];
                $sql = "SELECT v.*, u.userName,u.profileImg from tb_videos v inner join tb_users u on v.vid_userID=u.userID where v.vid_visibility = 'public' and v.vid_status = 'published' and ((`vid_name` LIKE '%" . $query . "%') OR (`vid_description` LIKE '%" . $query . "%') OR (`userName` LIKE '%" . $query . "%')) ORDER BY RAND ()";
                include "populate_list.php";
                ?>
            </div>
        </div>
        <?php include "footer.php" ?>
    </section>
</body>

</html>

<!-- Testing Script -->
<script>
</script>