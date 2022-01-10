-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2022 at 05:40 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_telenode`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `userID` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `profileImg` varchar(255) NOT NULL DEFAULT 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode.svg?background=%232a2a2a',
  `theme` varchar(255) NOT NULL DEFAULT 'light'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`userID`, `userEmail`, `userName`, `userPassword`, `profileImg`, `theme`) VALUES
(1, 'user@mail.com', 'username', '$2y$10$OTIUKL5pruKs2rnsT5FKZ.ykvxhW0HiypifbF9I9rUQQ.K2i1Xlfe', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-username1640640125.svg?background=%232a2a2a', 'dark'),
(2, 'user2@mail.test', 'user2', '$2y$10$bky1sTN0.uD8ucbtjbbo/.s8glKu2RMcOoa2rkyo9Yvi9tsZHJcHm', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode.svg?background=%232a2a2a', 'light'),
(4, 'admin@tele.com', 'admin', '$2y$10$/TNLvoSUpprmunHXieuNReh4nOlFJbFQ5NfjAxP0vCz4qdIW1l/kK', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode1637862951.svg?background=%232a2a2a', 'light'),
(6, 'wei@mail.com', 'weiwei', '$2y$10$xI/LkHjDzStDHyB9MdF4BewShNvHS13dpCxz2ZllEFd2FLH.R1P4y', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-weiwei1637888565.svg?background=%232a2a2a', 'light'),
(7, 'jbw@mail.com', 'jbw', '$2y$10$ZbUuiPv/h6jfo//lm1ZM4emaKWVykx3SP8EO/JkvYEFYwauQWeptG', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-jbw1637959280.svg?background=%232a2a2a', 'light'),
(8, 'mom@mail.com', 'mom', '$2y$10$pK56oygiMLYafq675iXOZeI1S8VAieehZZTQSc019erx84/NO9aom', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-mom1638092343.svg?background=%232a2a2a', 'light'),
(9, 'iwp@mail.com', 'iwp', '$2y$10$r.K9wpPzdk7oQCzqbpav7.75es1IZjnpIAnZEFM3XR5XgPZz4gfni', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-iwp1638314697.svg?background=%232a2a2a', 'light'),
(10, 'acc@mail.com', 'acc', '$2y$10$r0SbkomWT6DRxx1cAjxmWO.CWmcDKdGXrIhkK7/NbDB7h0zxiGlr2', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-acc1638932731.svg?background=%232a2a2a', 'light'),
(11, 'new@mail.com', 'new', '$2y$10$I8UnI7mHdR3ClxfA5StXyuW19ACu0aQ0wDYHWH7C95eFf7WYkqVY6', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-new1640284651.svg?background=%232a2a2a', 'dark'),
(12, 'blah@mail.com', 'blah', '$2y$10$OsoAOAmqGfpJ6AL09kWHw.tMZs8/BBIwjOW2YtLBrKrB01.0.OafC', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-blah1640640125.svg?background=%232a2a2a', 'light'),
(13, 'oonceydooncey@mail.com', 'oonceydooncey', '$2y$10$SRrN74zezOwEKUQCH5e5jOG0uI4pr.4EwKP1UQKpnj0x67SFH9swm', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-oonceydooncey1641089821.svg?background=%232a2a2a', 'light');

-- --------------------------------------------------------

--
-- Table structure for table `tb_videos`
--

CREATE TABLE `tb_videos` (
  `vid_id` int(11) NOT NULL,
  `vid_UID` varchar(255) NOT NULL,
  `vid_userID` int(11) NOT NULL,
  `vid_URLS` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vid_projectData` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vid_name` varchar(255) NOT NULL DEFAULT 'A TeleNode Project',
  `vid_description` varchar(1000) NOT NULL DEFAULT 'A work in progress TeleNode project',
  `vid_thumbnail` varchar(255) NOT NULL DEFAULT 'img/placeholder_thumbnail.png',
  `vid_visibility` varchar(255) NOT NULL DEFAULT 'public',
  `vid_status` varchar(255) NOT NULL DEFAULT 'unpublished',
  `vid_views` int(11) NOT NULL DEFAULT 0,
  `vid_uploadTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_videos`
--

INSERT INTO `tb_videos` (`vid_id`, `vid_UID`, `vid_userID`, `vid_URLS`, `vid_projectData`, `vid_name`, `vid_description`, `vid_thumbnail`, `vid_visibility`, `vid_status`, `vid_views`, `vid_uploadTime`) VALUES
(23, 'N2RkMzMzNzR', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=Qa8IfEeBJqk\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=ELLy1HOFQGI\",\"video_2\":\"https:\\/\\/www.youtube.com\\/watch?v=ahPYCzOr7to\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"What is haskell\",\"videoID\":\"Qa8IfEeBJqk\",\"options\":[{\"title\":\"Food\",\"videoID\":\"ELLy1HOFQGI\"},{\"title\":\"Germans\",\"videoID\":\"ahPYCzOr7to\"},{\"title\":\"\"}]},{\"blockID\":\"Food\",\"questionTitle\":\"\",\"videoID\":\"ELLy1HOFQGI\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Germans\",\"questionTitle\":\"\",\"videoID\":\"ahPYCzOr7to\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'This is a private video', 'This video should only be visible to  account name: \"username\" ', 'https://i.ytimg.com/vi/Qa8IfEeBJqk/hqdefault.jpg', 'private', 'published', 2, '2021-11-29 20:51:41'),
(24, 'MDVhMmU1Nzc', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=2ouaI-pcyeA\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=vKVF0cHoXGI\",\"video_2\":\"https:\\/\\/www.youtube.com\\/watch?v=ySXPnjStay4\",\"video_3\":\"https:\\/\\/www.youtube.com\\/watch?v=5vDq5DXXxss\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"qwe\",\"videoID\":\"2ouaI-pcyeA\",\"options\":[{\"title\":\"asd\",\"videoID\":\"vKVF0cHoXGI\"},{\"title\":\"zxc\",\"videoID\":\"ySXPnjStay4\"},{\"title\":\"dfg\",\"videoID\":\"5vDq5DXXxss\"}]},{\"blockID\":\"asd\",\"questionTitle\":\"\",\"videoID\":\"vKVF0cHoXGI\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"zxc\",\"questionTitle\":\"\",\"videoID\":\"ySXPnjStay4\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"dfg\",\"questionTitle\":\"\",\"videoID\":\"5vDq5DXXxss\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'This is an unlisted project', 'This project should only be able to be viewed by users with the direct link. It will not appear on the dashboard!', 'https://i.ytimg.com/vi/2ouaI-pcyeA/hqdefault.jpg', 'unlisted', 'published', 0, '2021-11-29 22:21:47'),
(25, 'YzkzMjUyZTQ', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=Gjnup-PuquQ\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=JWpK4oeBQQw\",\"video_2\":\"https:\\/\\/www.youtube.com\\/watch?v=nWeqOTN6Dp0\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"Boat or code?\",\"videoID\":\"Gjnup-PuquQ\",\"options\":[{\"title\":\"Boat\",\"videoID\":\"JWpK4oeBQQw\"},{\"title\":\"Code\",\"videoID\":\"nWeqOTN6Dp0\"},{\"title\":\"\"}]},{\"blockID\":\"Boat\",\"questionTitle\":\"\",\"videoID\":\"JWpK4oeBQQw\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Code\",\"questionTitle\":\"\",\"videoID\":\"nWeqOTN6Dp0\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'im on a boat look at me', 'Hello im on a boat lol', 'https://i.ytimg.com/vi/Gjnup-PuquQ/hqdefault.jpg', 'public', 'published', 4, '2021-11-30 13:08:41'),
(26, 'MzgzMDY2ZDF', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=MJru0mzMGZg\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=ELLy1HOFQGI\",\"video_2\":\"https:\\/\\/www.youtube.com\\/\\/watch?v=vxiHxVgFGxI\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"How to type faster?\",\"videoID\":\"vxiHxVgFGxI\",\"options\":[{\"title\":\"A. Use literal magic lol\",\"videoID\":\"MJru0mzMGZg\"},{\"title\":\"B. Nutella\",\"videoID\":\"ELLy1HOFQGI\"},{\"title\":\"\"}]},{\"blockID\":\"A. Use literal magic lol\",\"questionTitle\":\"\",\"videoID\":\"MJru0mzMGZg\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"B. Nutella\",\"questionTitle\":\"\",\"videoID\":\"ELLy1HOFQGI\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'A cool Project', 'yea', 'https://i.ytimg.com/vi/MJru0mzMGZg/hqdefault.jpg', 'unlisted', 'published', 1, '2021-11-30 13:50:24'),
(27, 'YmNhYjk0ZDF', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=HCiLvG1l_JM\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'A TeleNode Project', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/HCiLvG1l_JM/hqdefault.jpg', 'private', 'unpublished', 0, '2021-11-30 15:32:50'),
(28, 'MDZhYjY5NWJ', 1, '{\"video_0\":\"https:\\/\\/youtu.be\\/otDPUUYxL3c\",\"video_1\":\"https:\\/\\/youtu.be\\/oo3qUwVJ-4g\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'Dog Video haha', 'is dog', 'https://i.ytimg.com/vi/otDPUUYxL3c/hqdefault.jpg', 'private', 'unpublished', 0, '2021-11-30 21:49:31'),
(29, 'NGZlN2ZkY2Y', 1, '{\"video_0\":\"https:\\/\\/youtu.be\\/imXmg6mcRaE\",\"video_1\":\"https:\\/\\/youtu.be\\/P-5qAm2nUnU\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'wash dog', 'doggy', 'https://i.ytimg.com/vi/imXmg6mcRaE/hqdefault.jpg', 'private', 'unpublished', 0, '2021-11-30 21:50:10'),
(30, 'Yjg2NWNhYzc', 1, '{\"video_0\":\"https:\\/\\/youtu.be\\/P-5qAm2nUnU\",\"video_1\":\"https:\\/\\/youtu.be\\/6VGG19W08UQ\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'amgry dog', 'dog be amgers', 'https://i.ytimg.com/vi/P-5qAm2nUnU/hqdefault.jpg', 'private', 'unpublished', 0, '2021-11-30 21:50:33'),
(32, 'ODI4YjI1Y2F', 1, '{\"video_0\":\"https:\\/\\/youtu.be\\/6WQphW7wS7E\",\"video_1\":\"https:\\/\\/youtu.be\\/6WQphW7wS7E\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'doobydobap is good food maker', 'make good food is she', 'https://i.ytimg.com/vi/6WQphW7wS7E/hqdefault.jpg', 'private', 'published', 0, '2021-11-30 21:51:33'),
(33, 'ZTQ1MWZlNmQ', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=q8LscnDnhJc\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=O-RO4tWA0Rs\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"a\",\"videoID\":\"q8LscnDnhJc\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'mrbeast squid game', 'epic', 'https://i.ytimg.com/vi/q8LscnDnhJc/hqdefault.jpg', 'private', 'published', 1, '2021-11-30 21:56:04'),
(34, 'MTQ5OWNkZTQ', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=ecK3EnyGD8o\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=wK9OHVxB_Z8\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'git git github', 'asd', 'https://i.ytimg.com/vi/ecK3EnyGD8o/hqdefault.jpg', 'private', 'published', 0, '2021-11-30 21:56:45'),
(35, 'NGE5YWE2ZjY', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=_wNsZEqpKUA\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=OH3JFQyRKFg\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'biliy eilish', 'qwerty', 'https://i.ytimg.com/vi/_wNsZEqpKUA/hqdefault.jpg', 'private', 'unpublished', 0, '2021-11-30 21:57:17'),
(36, 'MTU1OTQ4ODk', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=MRDVNs1_iII\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=MbqSMgMAzxU\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"Why cat ugly\",\"videoID\":\"MRDVNs1_iII\",\"options\":[{\"title\":\"Mom no love lol\",\"videoID\":\"MbqSMgMAzxU\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Mom no love lol\",\"questionTitle\":\"\",\"videoID\":\"MbqSMgMAzxU\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'uggo catto', 'this cat uggo maximo', 'https://i.ytimg.com/vi/MRDVNs1_iII/hqdefault.jpg', 'public', 'published', 2, '2021-11-30 21:58:15'),
(37, 'OThlOTg5MTV', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=V78fIJtJSoc\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=DaSkda4XW3k\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"Test\",\"videoID\":\"V78fIJtJSoc\",\"options\":[{\"title\":\"a\",\"videoID\":\"DaSkda4XW3k\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"a\",\"questionTitle\":\"\",\"videoID\":\"DaSkda4XW3k\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'its ttrue', 'he best', 'https://i.ytimg.com/vi/V78fIJtJSoc/hqdefault.jpg', 'public', 'published', 4, '2021-11-30 21:59:21'),
(40, 'N2M1MTQwMTl', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=YE7VzlLtp-4\",\"video_1\":\" https:\\/\\/www.youtube.com\\/watch?v=JTOJsU3FSD8\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'This is the IWP VIDEO', 'For IWP', 'https://i.ytimg.com/vi/YE7VzlLtp-4/hqdefault.jpg', 'private', 'unpublished', 0, '2021-11-30 23:25:56'),
(42, 'N2YxMWIwNGU', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=FcEVbVrNIyg\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=LXb3EKWsInQ\",\"video_2\":\" https:\\/\\/www.youtube.com\\/watch?v=xcJtL7QggTI\",\"video_3\":\"https:\\/\\/www.youtube.com\\/watch?v=uNVJQCGxqb0\",\"video_4\":\"https:\\/\\/www.youtube.com\\/watch?v=E5ln4uR4TwQ\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"\",\"videoID\":\"\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'A public Video', 'The Description', 'https://i.ytimg.com/vi/FcEVbVrNIyg/hqdefault.jpg', 'private', 'published', 0, '2021-12-08 03:06:58'),
(47, 'MmEyMGI0MTR', 1, '{\"video_0\":\"https://www.youtube.com/watch?v=XFqn3uy238E\",\"video_2\":\"https://www.youtube.com/watch?v=OEV8gMkCHXQ\",\"video_3\":\"https://www.youtube.com/watch?v=kdvVwGrV7ec\",\"video_4\":\"https://www.youtube.com/watch?v=akDIJa0AP5c\",\"video_5\":\"0FH9cgRhQ-k\",\"video_6\":\"QiKZYt9070U\",\"video_8\":\"JdAaO-MK8DU\",\"video_9\":\"bFkIG9S2Mmg\",\"video_10\":\"ClQ-ymoXJZc\",\"video_11\":\"DxREm3s1scA\",\"video_12\":\"aIqAHYuFdSw\",\"video_13\":\"NvJ2uYN8qtg\",\"video_16\":\"Id0J5NV6aH4\",\"video_14\":\"UwrZkg6JOOU\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"Thisasiasdasdasdadd asd #@# |? /\\\\[]\",\"videoID\":\"XFqn3uy238E\",\"options\":[{\"title\":\"Option 1?!#@# |? /\\\\[]\",\"videoID\":\"UwrZkg6JOOU\"},{\"title\":\"Option 2\",\"videoID\":\"OEV8gMkCHXQ\"},{\"title\":\"Option 3\",\"videoID\":\"kdvVwGrV7ec\"}]},{\"blockID\":\"Option 1?!#@# |? /\\\\[]\",\"questionTitle\":\"Question 2\",\"videoID\":\"UwrZkg6JOOU\",\"options\":[{\"title\":\"\",\"videoID\":\"0FH9cgRhQ-k\"},{\"title\":\"\",\"videoID\":\"akDIJa0AP5c\"},{\"title\":\"\"}]},{\"blockID\":\"Option 2\",\"questionTitle\":\"Question 3\",\"videoID\":\"OEV8gMkCHXQ\",\"options\":[{\"title\":\"\",\"videoID\":\"DxREm3s1scA\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 3\",\"questionTitle\":\"Question 4\",\"videoID\":\"kdvVwGrV7ec\",\"options\":[{\"title\":\"\",\"videoID\":\"Id0J5NV6aH4\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"0FH9cgRhQ-k\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"akDIJa0AP5c\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"QiKZYt9070U\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"DxREm3s1scA\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"JdAaO-MK8DU\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"JdAaO-MK8DU\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"Id0J5NV6aH4\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'My first project :)', 'Is my first time yippie', 'thumbnail/IMG_1641054596ZTQ1Y2.png', 'public', 'published', 28, '2021-12-10 18:46:41'),
(53, 'ZjIwMjcyZmM', 11, '{\"video_0\":\"_8K3QXWgu_0\",\"video_1\":\"zZcyiA8cFkM\",\"video_2\":\"BMIfYprYFSI\",\"video_3\":\"37qLdYT7IRM\",\"video_4\":\"HePvLYiZVko\",\"video_5\":\"qI-k9QGNbR8\",\"video_6\":\"v0So51Q6GLg\",\"video_7\":\"ggNcR40FqW8\",\"video_8\":\"WhvxqvzrDqA\",\"video_9\":\"jXAbMcttwtI\",\"video_10\":\"hrORwk_RZLM\",\"video_11\":\"frkSRN-rAME\",\"video_12\":\"6rTrbYkXVyk\",\"video_13\":\"BL2pY9SmWu4\",\"video_14\":\"EWF5vK-w8lY\",\"video_15\":\"UwvHgaYCGuI\",\"video_16\":\"fnj2NUO0nXc\",\"video_17\":\"LtuznoXmb-c\",\"video_18\":\"Dyrmfv0JbIU\",\"video_19\":\"kQNCI35XIqk\",\"video_20\":\"u044iM9xsWU\",\"video_21\":\"EBIsZlV1jHk\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"Question 1\",\"videoID\":\"EBIsZlV1jHk\",\"options\":[{\"title\":\"Option 1\",\"videoID\":\"37qLdYT7IRM\"},{\"title\":\"Option 2\",\"videoID\":\"BMIfYprYFSI\"},{\"title\":\"Option 3\",\"videoID\":\"zZcyiA8cFkM\"}]},{\"blockID\":\"Option 1\",\"questionTitle\":\"Question 2\",\"videoID\":\"37qLdYT7IRM\",\"options\":[{\"title\":\"Option 4\",\"videoID\":\"HePvLYiZVko\"},{\"title\":\"Option 5\",\"videoID\":\"qI-k9QGNbR8\"},{\"title\":\"Option 6\",\"videoID\":\"v0So51Q6GLg\"}]},{\"blockID\":\"Option 2\",\"questionTitle\":\"Question 3\",\"videoID\":\"BMIfYprYFSI\",\"options\":[{\"title\":\"Option 7\",\"videoID\":\"ggNcR40FqW8\"},{\"title\":\"Option 8\",\"videoID\":\"WhvxqvzrDqA\"},{\"title\":\"Option 9\",\"videoID\":\"jXAbMcttwtI\"}]},{\"blockID\":\"Option 3\",\"questionTitle\":\"Question 4\",\"videoID\":\"zZcyiA8cFkM\",\"options\":[{\"title\":\"Option 10\",\"videoID\":\"hrORwk_RZLM\"},{\"title\":\"Option 11\",\"videoID\":\"frkSRN-rAME\"},{\"title\":\"Option 12\",\"videoID\":\"6rTrbYkXVyk\"}]},{\"blockID\":\"Option 4\",\"questionTitle\":\"\",\"videoID\":\"HePvLYiZVko\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 5\",\"questionTitle\":\"\",\"videoID\":\"qI-k9QGNbR8\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 6\",\"questionTitle\":\"\",\"videoID\":\"v0So51Q6GLg\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 7\",\"questionTitle\":\"\",\"videoID\":\"ggNcR40FqW8\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 8\",\"questionTitle\":\"\",\"videoID\":\"WhvxqvzrDqA\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 9\",\"questionTitle\":\"\",\"videoID\":\"jXAbMcttwtI\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 10\",\"questionTitle\":\"\",\"videoID\":\"hrORwk_RZLM\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 11\",\"questionTitle\":\"\",\"videoID\":\"frkSRN-rAME\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Option 12\",\"questionTitle\":\"\",\"videoID\":\"6rTrbYkXVyk\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'A TeleNode Project', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/_8K3QXWgu_0/hqdefault.jpg', 'public', 'published', 10837461, '2021-12-24 17:18:07'),
(54, 'Y2E4OWRjZjd', 1, '{\"video_0\":\"https://www.youtube.com/watch?v=kd2KEHvK-q8\",\"video_1\":\"https://www.youtube.com/watch?v=PHe0bXAIuk0\",\"video_2\":\"https://www.youtube.com/watch?v=IDcyXtweHCw\",\"video_4\":\"https://www.youtube.com/watch?v=3c584TGG7jQ\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"What makes planes fly?\",\"videoID\":\"kd2KEHvK-q8\",\"options\":[{\"title\":\"Magic\",\"videoID\":\"3c584TGG7jQ\"},{\"title\":\"Science\",\"videoID\":\"IDcyXtweHCw\"},{\"title\":\"Lift and thrust lol\",\"videoID\":\"PHe0bXAIuk0\"}]},{\"blockID\":\"Magic\",\"questionTitle\":\"\",\"videoID\":\"3c584TGG7jQ\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Science\",\"questionTitle\":\"\",\"videoID\":\"IDcyXtweHCw\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Lift and thrust lol\",\"questionTitle\":\"\",\"videoID\":\"PHe0bXAIuk0\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'How planes work', 'Let\'s learn how planes work and stuff', 'https://i.ytimg.com/vi/kd2KEHvK-q8/hqdefault.jpg', 'public', 'published', 70, '2021-12-27 21:33:01'),
(64, 'ZTUzN2E1OTM', 1, '{\"video_0\":\"2IbRtjez6ag\",\"video_1\":\"ELLy1HOFQGI\",\"video_2\":\"ahPYCzOr7to\",\"video_3\":\"EAmIEQb9QhM\",\"video_4\":\"3c584TGG7jQ\",\"video_5\":\"p9_EiVtyMOo\",\"video_6\":\"K7T9ZURhQxA\",\"video_7\":\"ggNcR40FqW8\",\"video_8\":\"afMsYAo1cXE\",\"video_9\":\"jXAbMcttwtI\",\"video_10\":\"0Q0i8RCU-ec\",\"video_11\":\"frkSRN-rAME\",\"video_12\":\"6rTrbYkXVyk\",\"video_13\":\"BL2pY9SmWu4\",\"video_14\":\"EWF5vK-w8lY\",\"video_15\":\"UwvHgaYCGuI\",\"video_16\":\"fnj2NUO0nXc\",\"video_17\":\"LtuznoXmb-c\",\"video_18\":\"Dyrmfv0JbIU\",\"video_19\":\"kQNCI35XIqk\",\"video_20\":\"u044iM9xsWU\",\"video_21\":\"EBIsZlV1jHk\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"What is the color of sky?\",\"videoID\":\"2IbRtjez6ag\",\"options\":[{\"title\":\"Blue\",\"videoID\":\"fnj2NUO0nXc\"},{\"title\":\"\",\"videoID\":\"EAmIEQb9QhM\"},{\"title\":\"Yellow\",\"videoID\":\"ELLy1HOFQGI\"}]},{\"blockID\":\"Blue\",\"questionTitle\":\"Are u german?\",\"videoID\":\"fnj2NUO0nXc\",\"options\":[{\"title\":\"Im german\",\"videoID\":\"ahPYCzOr7to\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"EAmIEQb9QhM\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Yellow\",\"questionTitle\":\"\",\"videoID\":\"ELLy1HOFQGI\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Im german\",\"questionTitle\":\"\",\"videoID\":\"ahPYCzOr7to\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'Cray', 'A work in progress TeleNode project\r\n\r\nI m trying to preserve white space lets see if it works?', 'https://i.ytimg.com/vi/2IbRtjez6ag/hqdefault.jpg', 'public', 'published', 10, '2022-01-01 20:50:47'),
(67, 'M2U5NjJjZGM', 1, '{\"video_0\":\"hiLlNzxDfAg\",\"video_1\":\"U1rSxOSnMXY\",\"video_2\":\"3RkhZgRNC1k\",\"video_3\":\"fTgm36y884c\",\"video_4\":\"Vxwx5VflRN4\",\"video_5\":\"Rlg4K16ujFw\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"What does chris like to eat?\",\"videoID\":\"3RkhZgRNC1k\",\"options\":[{\"title\":\"Cheese haha\",\"videoID\":\"fTgm36y884c\"},{\"title\":\"AI Garbage lol\",\"videoID\":\"U1rSxOSnMXY\"},{\"title\":\"\"}]},{\"blockID\":\"Cheese haha\",\"questionTitle\":\"What is ur fav tech\",\"videoID\":\"fTgm36y884c\",\"options\":[{\"title\":\"Intel\",\"videoID\":\"Vxwx5VflRN4\"},{\"title\":\"Steam\",\"videoID\":\"Rlg4K16ujFw\"},{\"title\":\"\"}]},{\"blockID\":\"AI Garbage lol\",\"questionTitle\":\"Jeff bezos stanky\",\"videoID\":\"U1rSxOSnMXY\",\"options\":[{\"title\":\"\",\"videoID\":\"hiLlNzxDfAg\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Intel\",\"questionTitle\":\"\",\"videoID\":\"Vxwx5VflRN4\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Intel\",\"questionTitle\":\"\",\"videoID\":\"Vxwx5VflRN4\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Steam\",\"questionTitle\":\"\",\"videoID\":\"Rlg4K16ujFw\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"hiLlNzxDfAg\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"hiLlNzxDfAg\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'This is a showcase of how cool this is', 'This is jsut a description', 'thumbnail/IMG_1641111168MzhkNz.jpg', 'private', 'published', 0, '2022-01-02 08:09:50'),
(78, 'MmU1MjY1MDh', 1, '{\"video_1\":\"2IbRtjez6ag\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"asd\",\"videoID\":\"2IbRtjez6ag\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'A TeleNode Project', 'A work in progress TeleNode project', 'thumbnail/IMG_1641385641NjY2MD.jpg', 'public', 'published', 20, '2022-01-05 07:52:27'),
(91, 'YjE3YmRiZGM', 1, '{\"video_0\":\"2IbRtjez6ag\",\"video_1\":\"ELLy1HOFQGI\",\"video_2\":\"ahPYCzOr7to\",\"video_3\":\"EAmIEQb9QhM\",\"video_4\":\"3c584TGG7jQ\",\"video_5\":\"p9_EiVtyMOo\",\"video_6\":\"K7T9ZURhQxA\",\"video_7\":\"ggNcR40FqW8\",\"video_8\":\"afMsYAo1cXE\",\"video_9\":\"jXAbMcttwtI\",\"video_10\":\"0Q0i8RCU-ec\",\"video_11\":\"frkSRN-rAME\",\"video_12\":\"6rTrbYkXVyk\",\"video_13\":\"BL2pY9SmWu4\",\"video_14\":\"EWF5vK-w8lY\",\"video_15\":\"UwvHgaYCGuI\",\"video_16\":\"fnj2NUO0nXc\",\"video_17\":\"LtuznoXmb-c\",\"video_18\":\"Dyrmfv0JbIU\",\"video_19\":\"kQNCI35XIqk\",\"video_20\":\"u044iM9xsWU\",\"video_21\":\"EBIsZlV1jHk\"}', '[{\"blockID\":\"Starting question\",\"questionTitle\":\"What is the color of sky?\",\"videoID\":\"2IbRtjez6ag\",\"options\":[{\"title\":\"Blue\",\"videoID\":\"fnj2NUO0nXc\"},{\"title\":\"\",\"videoID\":\"EAmIEQb9QhM\"},{\"title\":\"Yellow\",\"videoID\":\"ELLy1HOFQGI\"}]},{\"blockID\":\"Blue\",\"questionTitle\":\"Are u german?\",\"videoID\":\"fnj2NUO0nXc\",\"options\":[{\"title\":\"Im german\",\"videoID\":\"ahPYCzOr7to\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"\",\"questionTitle\":\"\",\"videoID\":\"EAmIEQb9QhM\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Yellow\",\"questionTitle\":\"\",\"videoID\":\"ELLy1HOFQGI\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]},{\"blockID\":\"Im german\",\"questionTitle\":\"\",\"videoID\":\"ahPYCzOr7to\",\"options\":[{\"title\":\"\"},{\"title\":\"\"},{\"title\":\"\"}]}]', 'A TeleNode Project', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/A/hqdefault.jpg', 'public', 'published', 2, '2022-01-06 18:59:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `tb_videos`
--
ALTER TABLE `tb_videos`
  ADD PRIMARY KEY (`vid_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_videos`
--
ALTER TABLE `tb_videos`
  MODIFY `vid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
