-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2023 at 04:31 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rsw_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int(1) NOT NULL,
  `dept_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`) VALUES
(1, 'บัญชี'),
(2, 'ธุรการ'),
(3, 'จัดซื้อ'),
(4, 'ฝ่ายขาย'),
(5, 'ขนส่ง'),
(6, 'สโตร์');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(4) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `emp_surname` varchar(50) NOT NULL,
  `emp_idcard` varchar(13) NOT NULL,
  `emp_gender` varchar(6) NOT NULL,
  `emp_birthdate` date NOT NULL,
  `emp_address` varchar(255) DEFAULT NULL,
  `emp_status` tinyint(1) NOT NULL DEFAULT 1,
  `emp_startdate` date NOT NULL,
  `emp_enddate` date DEFAULT NULL,
  `emp_mac1` varchar(17) DEFAULT NULL,
  `emp_mac2` varchar(17) DEFAULT NULL,
  `dept_id` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `emp_surname`, `emp_idcard`, `emp_gender`, `emp_birthdate`, `emp_address`, `emp_status`, `emp_startdate`, `emp_enddate`, `emp_mac1`, `emp_mac2`, `dept_id`) VALUES
(1001, 'จักรพันธ์', 'ภูพาพุทธ', '1470900098834', 'ชาย', '1995-05-23', NULL, 1, '2013-05-23', NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `holi_name` varchar(50) NOT NULL,
  `work_id` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_day`
--

CREATE TABLE `leave_day` (
  `leave_type` varchar(10) NOT NULL,
  `leave_date` date NOT NULL,
  `leave_description` varchar(255) NOT NULL,
  `leave_appove` tinyint(1) NOT NULL DEFAULT 0,
  `emp_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_attendance`
--

CREATE TABLE `time_attendance` (
  `time_in` time NOT NULL,
  `time_out` time DEFAULT NULL,
  `work_id` varchar(8) NOT NULL,
  `emp_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `time_attendance`
--

INSERT INTO `time_attendance` (`time_in`, `time_out`, `work_id`, `emp_id`) VALUES
('08:40:00', '17:00:00', '25660103', 1001),
('08:35:00', '17:00:00', '25660104', 1001);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(1) NOT NULL,
  `type_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`) VALUES
(1, 'Admin'),
(2, 'HR'),
(3, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` varchar(12) NOT NULL,
  `user_password` varchar(12) NOT NULL,
  `type_id` int(1) NOT NULL,
  `emp_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `user_password`, `type_id`, `emp_id`) VALUES
('jakkapan', '23052538', 1, 1001);

-- --------------------------------------------------------

--
-- Table structure for table `workday`
--

CREATE TABLE `workday` (
  `work_id` varchar(8) NOT NULL,
  `work_date` date NOT NULL,
  `work_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `workday`
--

INSERT INTO `workday` (`work_id`, `work_date`, `work_status`) VALUES
('25660102', '2023-01-02', 1),
('25660103', '2023-01-03', 1),
('25660104', '2023-01-04', 1),
('25660105', '2023-01-05', 1),
('25660106', '2023-01-06', 1),
('25660107', '2023-01-07', 1),
('25660109', '2023-01-09', 1),
('25660110', '2023-01-10', 1),
('25660111', '2023-01-11', 1),
('25660112', '2023-01-12', 1),
('25660113', '2023-01-13', 1),
('25660114', '2023-01-14', 1),
('25660116', '2023-01-16', 1),
('25660117', '2023-01-17', 1),
('25660118', '2023-01-18', 1),
('25660119', '2023-01-19', 1),
('25660120', '2023-01-20', 1),
('25660121', '2023-01-21', 1),
('25660123', '2023-01-23', 1),
('25660124', '2023-01-24', 1),
('25660125', '2023-01-25', 1),
('25660126', '2023-01-26', 1),
('25660127', '2023-01-27', 1),
('25660128', '2023-01-28', 1),
('25660130', '2023-01-30', 1),
('25660131', '2023-01-31', 1),
('25660201', '2023-02-01', 1),
('25660202', '2023-02-02', 1),
('25660203', '2023-02-03', 1),
('25660204', '2023-02-04', 1),
('25660206', '2023-02-06', 1),
('25660207', '2023-02-07', 1),
('25660208', '2023-02-08', 1),
('25660209', '2023-02-09', 1),
('25660210', '2023-02-10', 1),
('25660211', '2023-02-11', 1),
('25660213', '2023-02-13', 1),
('25660214', '2023-02-14', 1),
('25660215', '2023-02-15', 1),
('25660216', '2023-02-16', 1),
('25660217', '2023-02-17', 1),
('25660218', '2023-02-18', 1),
('25660220', '2023-02-20', 1),
('25660221', '2023-02-21', 1),
('25660222', '2023-02-22', 1),
('25660223', '2023-02-23', 1),
('25660224', '2023-02-24', 1),
('25660225', '2023-02-25', 1),
('25660227', '2023-02-27', 1),
('25660228', '2023-02-28', 1),
('25660301', '2023-03-01', 1),
('25660302', '2023-03-02', 1),
('25660303', '2023-03-03', 1),
('25660304', '2023-03-04', 1),
('25660306', '2023-03-06', 1),
('25660307', '2023-03-07', 1),
('25660308', '2023-03-08', 1),
('25660309', '2023-03-09', 1),
('25660310', '2023-03-10', 1),
('25660311', '2023-03-11', 1),
('25660313', '2023-03-13', 1),
('25660314', '2023-03-14', 1),
('25660315', '2023-03-15', 1),
('25660316', '2023-03-16', 1),
('25660317', '2023-03-17', 1),
('25660318', '2023-03-18', 1),
('25660320', '2023-03-20', 1),
('25660321', '2023-03-21', 1),
('25660322', '2023-03-22', 1),
('25660323', '2023-03-23', 1),
('25660324', '2023-03-24', 1),
('25660325', '2023-03-25', 1),
('25660327', '2023-03-27', 1),
('25660328', '2023-03-28', 1),
('25660329', '2023-03-29', 1),
('25660330', '2023-03-30', 1),
('25660331', '2023-03-31', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `holiday`
--
ALTER TABLE `holiday`
  ADD KEY `work_id` (`work_id`);

--
-- Indexes for table `leave_day`
--
ALTER TABLE `leave_day`
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `time_attendance`
--
ALTER TABLE `time_attendance`
  ADD KEY `work_id` (`work_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD KEY `type_id` (`type_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `workday`
--
ALTER TABLE `workday`
  ADD PRIMARY KEY (`work_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
