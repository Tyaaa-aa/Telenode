-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2021 at 11:47 PM
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
(1, 'user@mail.com', 'username', '$2y$10$bVOZsFGOU.2gnW9FoUjQjOQ26H7UQ.pXClkcMcwSItYT9bTgVnDw6', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode.svg?background=%232a2a2a', 'light'),
(2, 'user2@mail.test', 'user2', '$2y$10$bky1sTN0.uD8ucbtjbbo/.s8glKu2RMcOoa2rkyo9Yvi9tsZHJcHm', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode.svg?background=%232a2a2a', 'light'),
(4, 'admin@tele.com', 'admin', '$2y$10$/TNLvoSUpprmunHXieuNReh4nOlFJbFQ5NfjAxP0vCz4qdIW1l/kK', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode1637862951.svg?background=%232a2a2a', 'light'),
(6, 'wei@mail.com', 'weiwei', '$2y$10$xI/LkHjDzStDHyB9MdF4BewShNvHS13dpCxz2ZllEFd2FLH.R1P4y', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-weiwei1637888565.svg?background=%232a2a2a', 'light'),
(7, 'jbw@mail.com', 'jbw', '$2y$10$ZbUuiPv/h6jfo//lm1ZM4emaKWVykx3SP8EO/JkvYEFYwauQWeptG', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-jbw1637959280.svg?background=%232a2a2a', 'light'),
(8, 'mom@mail.com', 'mom', '$2y$10$pK56oygiMLYafq675iXOZeI1S8VAieehZZTQSc019erx84/NO9aom', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-mom1638092343.svg?background=%232a2a2a', 'light');

-- --------------------------------------------------------

--
-- Table structure for table `tb_videos`
--

CREATE TABLE `tb_videos` (
  `vid_id` int(11) NOT NULL,
  `vid_UID` varchar(255) NOT NULL,
  `vid_userID` int(11) NOT NULL,
  `vid_URLS` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vid_name` varchar(255) NOT NULL DEFAULT 'A TeleNode Project',
  `vid_description` varchar(1000) NOT NULL DEFAULT 'A work in progress TeleNode project',
  `vid_thumbnail` varchar(255) NOT NULL DEFAULT 'img/placeholder_thumbnail.png',
  `vid_visibility` varchar(255) NOT NULL DEFAULT 'unlisted',
  `vid_status` varchar(255) NOT NULL DEFAULT 'unpublished',
  `vid_uploadTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_videos`
--

INSERT INTO `tb_videos` (`vid_id`, `vid_UID`, `vid_userID`, `vid_URLS`, `vid_name`, `vid_description`, `vid_thumbnail`, `vid_visibility`, `vid_status`, `vid_uploadTime`) VALUES
(23, 'tn_37811350161a53d5dd4f265.90086571', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=Qa8IfEeBJqk\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=ELLy1HOFQGI\",\"video_2\":\"https:\\/\\/www.youtube.com\\/watch?v=ahPYCzOr7to\"}', 'This is the first test', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/Qa8IfEeBJqk/hqdefault.jpg', 'unlisted', 'unpublished', '2021-11-29 20:51:41'),
(24, 'tn_157822206561a5527b6a99f2.96895719', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=2ouaI-pcyeA\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=vKVF0cHoXGI\",\"video_2\":\"https:\\/\\/www.youtube.com\\/watch?v=ySXPnjStay4\",\"video_3\":\"https:\\/\\/www.youtube.com\\/watch?v=5vDq5DXXxss\"}', 'A TeleNode Project', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/2ouaI-pcyeA/hqdefault.jpg', 'unlisted', 'unpublished', '2021-11-29 22:21:47'),
(25, 'tn_190910489461a62259d1f3c0.98832060', 7, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=Gjnup-PuquQ\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=JWpK4oeBQQw\",\"video_2\":\"https:\\/\\/www.youtube.com\\/watch?v=nWeqOTN6Dp0\"}', 'A TeleNode Project', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/Gjnup-PuquQ/hqdefault.jpg', 'unlisted', 'unpublished', '2021-11-30 13:08:41'),
(26, 'tn_5116190861a62c20d189b', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=MJru0mzMGZg\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=ELLy1HOFQGI\",\"video_2\":\"https:\\/\\/www.youtube.com\\/\\/watch?v=vxiHxVgFGxI\"}', 'A cool Project', 'yea', 'https://i.ytimg.com/vi/MJru0mzMGZg/hqdefault.jpg', 'public', 'published', '2021-11-30 13:50:24'),
(27, 'tn_173313037961a6442299010', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=HCiLvG1l_JM\"}', 'A TeleNode Project', 'A work in progress TeleNode project', 'https://i.ytimg.com/vi/HCiLvG1l_JM/hqdefault.jpg', 'public', 'unpublished', '2021-11-30 15:32:50'),
(28, 'tn_79682495661a69c6b704dc', 6, '{\"video_0\":\"https:\\/\\/youtu.be\\/otDPUUYxL3c\",\"video_1\":\"https:\\/\\/youtu.be\\/oo3qUwVJ-4g\"}', 'Dog Video haha', 'is dog', 'https://i.ytimg.com/vi/otDPUUYxL3c/hqdefault.jpg', 'public', 'published', '2021-11-30 21:49:31'),
(29, 'tn_15516643461a69c9251ea5', 6, '{\"video_0\":\"https:\\/\\/youtu.be\\/imXmg6mcRaE\",\"video_1\":\"https:\\/\\/youtu.be\\/P-5qAm2nUnU\"}', 'wash dog', 'doggy', 'https://i.ytimg.com/vi/imXmg6mcRaE/hqdefault.jpg', 'public', 'published', '2021-11-30 21:50:10'),
(30, 'tn_190383599161a69ca93f0f8', 6, '{\"video_0\":\"https:\\/\\/youtu.be\\/P-5qAm2nUnU\",\"video_1\":\"https:\\/\\/youtu.be\\/6VGG19W08UQ\"}', 'amgry dog', 'dog be amgers', 'https://i.ytimg.com/vi/P-5qAm2nUnU/hqdefault.jpg', 'public', 'published', '2021-11-30 21:50:33'),
(31, 'tn_143066834861a69cc765168', 6, '{\"video_0\":\"https:\\/\\/youtu.be\\/wjsmj5SJxMs\",\"video_1\":\"https:\\/\\/youtu.be\\/dPjpU5tabCg\"}', 'Malaysian food', 'food in malaysia', 'https://i.ytimg.com/vi/wjsmj5SJxMs/hqdefault.jpg', 'public', 'published', '2021-11-30 21:51:03'),
(32, 'tn_157915288961a69ce5d8e18', 6, '{\"video_0\":\"https:\\/\\/youtu.be\\/6WQphW7wS7E\",\"video_1\":\"https:\\/\\/youtu.be\\/6WQphW7wS7E\"}', 'doobydobap is good food maker', 'make good food is she', 'https://i.ytimg.com/vi/6WQphW7wS7E/hqdefault.jpg', 'public', 'published', '2021-11-30 21:51:33'),
(33, 'tn_191609402761a69df4772d8', 6, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=q8LscnDnhJc\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=O-RO4tWA0Rs\"}', 'mrbeast squid game', 'epic', 'https://i.ytimg.com/vi/q8LscnDnhJc/hqdefault.jpg', 'public', 'published', '2021-11-30 21:56:04'),
(34, 'tn_204183140761a69e1d8eeb9', 6, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=ecK3EnyGD8o\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=wK9OHVxB_Z8\"}', 'git git github', 'asd', 'https://i.ytimg.com/vi/ecK3EnyGD8o/hqdefault.jpg', 'public', 'published', '2021-11-30 21:56:45'),
(35, 'tn_142269829661a69e3d39d82', 6, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=_wNsZEqpKUA\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=OH3JFQyRKFg\"}', 'biliy eilish', 'qwerty', 'https://i.ytimg.com/vi/_wNsZEqpKUA/hqdefault.jpg', 'public', 'published', '2021-11-30 21:57:17'),
(36, 'tn_159489342761a69e77aefd1', 6, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=MRDVNs1_iII\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=MbqSMgMAzxU\"}', 'uggo catto', 'this cat uggo maximo', 'https://i.ytimg.com/vi/MRDVNs1_iII/hqdefault.jpg', 'public', 'published', '2021-11-30 21:58:15'),
(37, 'tn_194605680561a69eb95fa67', 6, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=V78fIJtJSoc\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=DaSkda4XW3k\"}', 'its ttrue', 'he best', 'https://i.ytimg.com/vi/V78fIJtJSoc/hqdefault.jpg', 'public', 'published', '2021-11-30 21:59:21'),
(38, 'tn_43719657361a69f7f27e8b', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=0wZi0uErnMQ\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=mMeyPjC2Wrc\"}', 'Wow good cover haha', 'a good cover haha', 'https://i.ytimg.com/vi/0wZi0uErnMQ/hqdefault.jpg', 'public', 'published', '2021-11-30 22:02:39'),
(39, 'tn_160175099561a6a26b11ff7', 1, '{\"video_0\":\"https:\\/\\/www.youtube.com\\/watch?v=ydkQlJhodio\",\"video_1\":\"https:\\/\\/www.youtube.com\\/watch?v=1pBuwKwaHp0\"}', 'Coding is cool', 'cool code ', 'https://i.ytimg.com/vi/ydkQlJhodio/hqdefault.jpg', 'public', 'published', '2021-11-30 22:15:07');

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
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_videos`
--
ALTER TABLE `tb_videos`
  MODIFY `vid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
