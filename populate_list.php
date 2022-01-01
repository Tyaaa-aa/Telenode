<?php
include "db_connect.php";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        // Assign all user table content to variables for use later
        $hasVid = true;
        $getVid_id = $row['vid_id'];
        $getVid_UID = $row['vid_UID'];
        $getVid_userID = $row['vid_userID'];
        $getVid_URLS = $row['vid_URLS'];
        $getVid_Name = $row['vid_name'];
        $getVid_Description = $row['vid_description'];
        $getVid_Thumbnail = $row['vid_thumbnail'];
        $getVid_Visibility = $row['vid_visibility'];
        $getVid_Status = $row['vid_status'];
        $getVid_UploadTime = $row['vid_uploadTime'];

        $getVidData = [$getVid_id, $getVid_UID, $getVid_userID, $getVid_URLS, $getVid_Name, $getVid_Description, $getVid_Thumbnail, $getVid_Visibility, $getVid_Status, $getVid_UploadTime];

?>
        <div class="video_cards">
            <a href="watch.php?id=<?= $getVid_UID ?>">
                <div class="thumbnail-box">
                    <img class="thumbnail" src="<?= $getVid_Thumbnail ?>" alt="Thumbnail">
                </div>
                <h4>
                    <?= $getVid_Name ?>
                </h4>

            </a>
            
            <?php
                if (isset($_SESSION["userID"])) {
                    if ($getVid_userID == $_SESSION["userID"]) {
                ?>
                        <a href="edit.php?id=<?= $getVid_UID ?>" class="edit_btn" data-vid="<?= $getVid_UID ?>">
                            <span class="material-icons">
                                edit
                            </span>
                        </a>
                <?php
                    }
                }
                ?>
        </div>
    <?php
    }
} else {
    ?>
    <div>
        <br>
        You have no projects :(
        <a href="create.php" class="signup_btn btn">Start Creating</a>
    </div>
<?php
}
$conn->close();
?>