<div class="loading_bar"></div>

<h2>Dashboard</h2>
<div id="dashboard-container">
    <?php
    $sql = "SELECT * from tb_videos where vid_visibility = 'public' ORDER BY RAND ()";
    include "populate_list.php";
    ?>
</div>