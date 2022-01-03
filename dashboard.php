<div class="loading_bar"></div>

<!-- <h2>Dashboard</h2> -->
<div id="dashboard-container">
    <?php
    $sql = "SELECT v.vid_id,  v.vid_UID,  v.vid_userID,  v.vid_name,  v.vid_thumbnail,  v.vid_uploadTime, u.userName,u.profileImg from tb_videos v inner join tb_users u on v.vid_userID=u.userID where v.vid_visibility = 'public' ORDER BY RAND ()";
    include "populate_list.php";
    ?>
</div>