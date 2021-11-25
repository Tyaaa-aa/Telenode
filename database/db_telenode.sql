-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2021 at 09:14 PM
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
(4, 'admin@tele.com', 'admin', '$2y$10$/TNLvoSUpprmunHXieuNReh4nOlFJbFQ5NfjAxP0vCz4qdIW1l/kK', 'https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode1637862951.svg?background=%232a2a2a', 'light');

-- --------------------------------------------------------

--
-- Table structure for table `tb_videos`
--

CREATE TABLE `tb_videos` (
  `vid_id` int(11) NOT NULL,
  `vid_userID` int(11) NOT NULL,
  `vid_URLS` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`vid_URLS`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_videos`
--

INSERT INTO `tb_videos` (`vid_id`, `vid_userID`, `vid_URLS`) VALUES
(1, 1, '{\r\n    \"videos\": [\"Tn6-PIqc4UM\", \"zsjvFFKOm3c\", \"PeMlggyqz0Y\"],\r\n    \"questions\": [{\r\n            \"question one\": true,\r\n            \"question two\": false\r\n        },\r\n        {\r\n            \"question three\": false,\r\n            \"question four\": true\r\n        }\r\n    ]\r\n}');

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
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_videos`
--
ALTER TABLE `tb_videos`
  MODIFY `vid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
