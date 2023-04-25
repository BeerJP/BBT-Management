-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2023 at 05:39 AM
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
(1, 'ออฟฟิศ 1'),
(2, 'ออฟฟิศ 2'),
(3, 'สโตร์ & ขนส่ง');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(4) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `emp_surname` varchar(50) NOT NULL,
  `emp_gender` varchar(5) NOT NULL,
  `emp_birthdate` date NOT NULL,
  `emp_status` tinyint(1) NOT NULL DEFAULT 1,
  `emp_startdate` date NOT NULL,
  `emp_enddate` date DEFAULT NULL,
  `emp_mac1` varchar(17) NOT NULL,
  `emp_mac2` varchar(17) DEFAULT NULL,
  `dept_id` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `emp_surname`, `emp_gender`, `emp_birthdate`, `emp_status`, `emp_startdate`, `emp_enddate`, `emp_mac1`, `emp_mac2`, `dept_id`) VALUES
(1000, 'Admin', ' ', 'ชาย', '1995-05-23', 0, '2013-06-01', '2013-06-01', '00:00:00:00:00:00', '00:00:00:00:00:00', 1),
(1001, 'จักพันธ์', 'ภูพาพุทธ', 'ชาย', '1995-05-23', 1, '2013-06-01', NULL, '00:00:00:00:00:00', '00:00:00:00:00:00', 2),
(1002, 'อลงกรณ์', 'อนุโยธา', 'ชาย', '1984-11-17', 1, '2013-06-01', NULL, '00:00:00:00:00:00', '00:00:00:00:00:00', 3),
(1003, 'เดชพงษ์', 'เป็นวงศ์', 'ชาย', '1986-04-06', 1, '2013-06-01', NULL, '00:00:00:00:00:00', '00:00:00:00:00:00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `holi_name` varchar(255) NOT NULL,
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
  `leave_status` tinyint(1) NOT NULL,
  `leave_approve` int(1) NOT NULL,
  `emp_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `leave_day`
--

INSERT INTO `leave_day` (`leave_type`, `leave_date`, `leave_description`, `leave_status`, `leave_approve`, `emp_id`) VALUES
('ลากิจ', '2023-01-21', 'ไปต่างจังหวัด', 1, 1, 1001),
('ลาป่วย', '2023-01-24', 'เป็นไข้', 1, 1, 1001),
('ลาป่วย', '2023-01-21', 'ไม่สบาย', 1, 1, 1002),
('ลากิจ', '2023-02-20', 'ไปธุระ', 1, 1, 1003),
('ลาพักร้อน', '2023-02-04', 'ไปต่างจังหวัด', 1, 1, 1002),
('ลาพักร้อน', '2023-02-18', 'ไปต่างจังหวัด', 1, 1, 1002),
('ลากิจ', '2023-03-18', 'ไปธุระ', 1, 1, 1003),
('ลากิจ', '2023-03-18', 'ไปธุระ', 1, 1, 1002),
('ลาพักร้อน', '2023-03-03', 'ไปต่างจังหวัด', 1, 1, 1001),
('ลาพักร้อน', '2023-03-04', 'ไปต่างจังหวัด', 1, 1, 1001);

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
('08:38:00', '17:00:00', '25660103', 1001),
('08:29:00', '17:00:00', '25660104', 1001),
('08:31:00', '17:00:00', '25660105', 1001),
('08:36:00', '17:00:00', '25660106', 1001),
('08:25:00', '17:00:00', '25660107', 1001),
('08:34:00', '17:00:00', '25660109', 1001),
('08:31:00', '17:00:00', '25660110', 1001),
('08:34:00', '17:00:00', '25660111', 1001),
('08:37:00', '17:00:00', '25660112', 1001),
('08:34:00', '17:00:00', '25660113', 1001),
('08:31:00', '17:00:00', '25660114', 1001),
('08:40:00', '17:00:00', '25660116', 1001),
('08:32:00', '17:00:00', '25660117', 1001),
('08:32:00', '17:00:00', '25660118', 1001),
('08:33:00', '17:00:00', '25660119', 1001),
('08:34:00', '17:00:00', '25660120', 1001),
('08:35:00', '17:00:00', '25660123', 1001),
('08:33:00', '17:00:00', '25660125', 1001),
('08:37:00', '17:00:00', '25660126', 1001),
('08:35:00', '17:00:00', '25660127', 1001),
('08:45:00', '17:00:00', '25660130', 1001),
('08:36:00', '17:00:00', '25660131', 1001),
('08:28:00', '17:00:00', '25660201', 1001),
('08:35:00', '17:00:00', '25660202', 1001),
('08:33:00', '17:00:00', '25660203', 1001),
('08:33:00', '17:00:00', '25660204', 1001),
('08:29:00', '17:00:00', '25660206', 1001),
('08:32:00', '17:00:00', '25660207', 1001),
('08:55:00', '17:00:00', '25660208', 1001),
('08:28:00', '17:00:00', '25660209', 1001),
('08:31:00', '17:00:00', '25660210', 1001),
('08:28:00', '17:00:00', '25660211', 1001),
('08:37:00', '17:00:00', '25660213', 1001),
('08:36:00', '17:00:00', '25660214', 1001),
('08:27:00', '17:00:00', '25660215', 1001),
('08:29:00', '17:00:00', '25660216', 1001),
('08:33:00', '17:00:00', '25660217', 1001),
('08:29:00', '17:00:00', '25660218', 1001),
('08:33:00', '17:00:00', '25660220', 1001),
('08:36:00', '17:00:00', '25660221', 1001),
('08:39:00', '17:00:00', '25660222', 1001),
('08:36:00', '17:00:00', '25660223', 1001),
('08:34:00', '17:00:00', '25660224', 1001),
('08:31:00', '17:00:00', '25660227', 1001),
('08:31:00', '17:00:00', '25660228', 1001),
('08:33:00', '17:00:00', '25660301', 1001),
('08:35:00', '17:00:00', '25660302', 1001),
('08:34:00', '17:00:00', '25660307', 1001),
('08:29:00', '17:00:00', '25660308', 1001),
('08:20:00', '17:00:00', '25660309', 1001),
('08:28:00', '17:00:00', '25660310', 1001),
('08:28:00', '17:00:00', '25660311', 1001),
('08:36:00', '17:00:00', '25660313', 1001),
('08:24:00', '17:00:00', '25660314', 1001),
('08:40:00', '17:00:00', '25660315', 1001),
('08:38:00', '17:00:00', '25660316', 1001),
('08:28:00', '17:00:00', '25660317', 1001),
('08:28:00', '17:00:00', '25660318', 1001),
('08:32:00', '17:00:00', '25660320', 1001),
('08:38:00', '17:00:00', '25660321', 1001),
('08:20:00', '17:00:00', '25660322', 1001),
('08:37:00', '17:00:00', '25660323', 1001),
('08:25:00', '17:00:00', '25660324', 1001),
('08:39:00', '17:00:00', '25660327', 1001),
('08:33:00', '17:00:00', '25660328', 1001),
('08:32:00', '17:00:00', '25660329', 1001),
('08:36:00', '17:00:00', '25660330', 1001),
('08:36:00', '17:00:00', '25660331', 1001),
('08:17:00', '17:00:00', '25660103', 1002),
('08:40:00', '17:00:00', '25660104', 1002),
('08:29:00', '17:00:00', '25660105', 1002),
('08:28:00', '17:00:00', '25660106', 1002),
('08:37:00', '17:00:00', '25660107', 1002),
('08:11:00', '17:00:00', '25660109', 1002),
('08:15:00', '17:00:00', '25660110', 1002),
('08:14:00', '17:00:00', '25660111', 1002),
('08:08:00', '17:00:00', '25660112', 1002),
('08:19:00', '17:00:00', '25660113', 1002),
('08:37:00', '17:00:00', '25660114', 1002),
('08:12:00', '17:00:00', '25660116', 1002),
('08:19:00', '17:00:00', '25660117', 1002),
('08:03:00', '17:00:00', '25660118', 1002),
('08:02:00', '17:00:00', '25660119', 1002),
('08:22:00', '17:00:00', '25660120', 1002),
('08:18:00', '17:00:00', '25660123', 1002),
('08:08:00', '17:00:00', '25660124', 1002),
('08:17:00', '17:00:00', '25660125', 1002),
('08:21:00', '17:00:00', '25660126', 1002),
('08:09:00', '17:00:00', '25660127', 1002),
('08:20:00', '17:00:00', '25660130', 1002),
('08:35:00', '17:00:00', '25660131', 1002),
('08:12:00', '17:00:00', '25660201', 1002),
('08:11:00', '17:00:00', '25660202', 1002),
('08:23:00', '17:00:00', '25660203', 1002),
('08:20:00', '17:00:00', '25660206', 1002),
('08:13:00', '17:00:00', '25660207', 1002),
('08:14:00', '17:00:00', '25660208', 1002),
('08:19:00', '17:00:00', '25660209', 1002),
('08:06:00', '17:00:00', '25660210', 1002),
('08:18:00', '17:00:00', '25660211', 1002),
('08:21:00', '17:00:00', '25660213', 1002),
('08:29:00', '17:00:00', '25660214', 1002),
('08:28:00', '17:00:00', '25660215', 1002),
('08:11:00', '17:00:00', '25660216', 1002),
('08:23:00', '17:00:00', '25660217', 1002),
('08:15:00', '17:00:00', '25660220', 1002),
('08:34:00', '17:00:00', '25660221', 1002),
('08:23:00', '17:00:00', '25660222', 1002),
('08:07:00', '17:00:00', '25660223', 1002),
('08:23:00', '17:00:00', '25660224', 1002),
('08:12:00', '17:00:00', '25660227', 1002),
('08:14:00', '17:00:00', '25660228', 1002),
('08:02:00', '17:00:00', '25660301', 1002),
('08:04:00', '17:00:00', '25660302', 1002),
('08:09:00', '17:00:00', '25660303', 1002),
('08:17:00', '17:00:00', '25660304', 1002),
('08:37:00', '17:00:00', '25660307', 1002),
('08:23:00', '17:00:00', '25660308', 1002),
('08:08:00', '17:00:00', '25660309', 1002),
('08:07:00', '17:00:00', '25660310', 1002),
('08:41:00', '17:00:00', '25660311', 1002),
('08:08:00', '17:00:00', '25660313', 1002),
('08:12:00', '17:00:00', '25660314', 1002),
('08:13:00', '17:00:00', '25660315', 1002),
('08:07:00', '17:00:00', '25660316', 1002),
('08:10:00', '17:00:00', '25660317', 1002),
('08:22:00', '17:00:00', '25660320', 1002),
('08:15:00', '17:00:00', '25660321', 1002),
('08:14:00', '17:00:00', '25660322', 1002),
('08:20:00', '17:00:00', '25660323', 1002),
('08:10:00', '17:00:00', '25660324', 1002),
('08:06:00', '17:00:00', '25660327', 1002),
('08:11:00', '17:00:00', '25660328', 1002),
('08:11:00', '17:00:00', '25660329', 1002),
('08:30:00', '17:00:00', '25660330', 1002),
('08:20:00', '17:00:00', '25660331', 1002),
('08:01:00', '17:00:00', '25660103', 1003),
('08:07:00', '17:00:00', '25660104', 1003),
('07:40:00', '17:00:00', '25660105', 1003),
('07:58:00', '17:00:00', '25660106', 1003),
('08:00:00', '17:00:00', '25660107', 1003),
('08:04:00', '17:00:00', '25660109', 1003),
('08:01:00', '17:00:00', '25660110', 1003),
('08:07:00', '17:00:00', '25660111', 1003),
('08:00:00', '17:00:00', '25660112', 1003),
('08:09:00', '17:00:00', '25660113', 1003),
('08:02:00', '17:00:00', '25660114', 1003),
('08:12:00', '17:00:00', '25660116', 1003),
('07:47:00', '17:00:00', '25660117', 1003),
('07:53:00', '17:00:00', '25660118', 1003),
('07:53:00', '17:00:00', '25660119', 1003),
('08:12:00', '17:00:00', '25660120', 1003),
('08:05:00', '17:00:00', '25660121', 1003),
('08:01:00', '17:00:00', '25660123', 1003),
('07:55:00', '17:00:00', '25660124', 1003),
('08:17:00', '17:00:00', '25660125', 1003),
('08:11:00', '17:00:00', '25660126', 1003),
('08:02:00', '17:00:00', '25660127', 1003),
('08:16:00', '17:00:00', '25660130', 1003),
('07:55:00', '17:00:00', '25660131', 1003),
('08:06:00', '17:00:00', '25660201', 1003),
('07:55:00', '17:00:00', '25660202', 1003),
('08:15:00', '17:00:00', '25660203', 1003),
('08:02:00', '17:00:00', '25660204', 1003),
('08:08:00', '17:00:00', '25660206', 1003),
('07:54:00', '17:00:00', '25660207', 1003),
('08:16:00', '17:00:00', '25660208', 1003),
('08:05:00', '17:00:00', '25660209', 1003),
('07:58:00', '17:00:00', '25660210', 1003),
('08:04:00', '17:00:00', '25660211', 1003),
('07:56:00', '17:00:00', '25660213', 1003),
('08:02:00', '17:00:00', '25660214', 1003),
('08:12:00', '17:00:00', '25660215', 1003),
('07:58:00', '17:00:00', '25660216', 1003),
('07:57:00', '17:00:00', '25660217', 1003),
('08:08:00', '17:00:00', '25660218', 1003),
('07:55:00', '17:00:00', '25660221', 1003),
('07:58:00', '17:00:00', '25660222', 1003),
('08:01:00', '17:00:00', '25660223', 1003),
('08:25:00', '17:00:00', '25660224', 1003),
('08:01:00', '17:00:00', '25660227', 1003),
('08:02:00', '17:00:00', '25660228', 1003),
('07:56:00', '17:00:00', '25660301', 1003),
('07:59:00', '17:00:00', '25660302', 1003),
('07:58:00', '17:00:00', '25660303', 1003),
('08:41:00', '17:00:00', '25660304', 1003),
('08:04:00', '17:00:00', '25660307', 1003),
('08:00:00', '17:00:00', '25660308', 1003),
('08:28:00', '17:00:00', '25660309', 1003),
('07:53:00', '17:00:00', '25660310', 1003),
('07:58:00', '17:00:00', '25660311', 1003),
('07:56:00', '17:00:00', '25660313', 1003),
('07:55:00', '17:00:00', '25660314', 1003),
('08:03:00', '17:00:00', '25660315', 1003),
('07:59:00', '17:00:00', '25660316', 1003),
('08:07:00', '17:00:00', '25660317', 1003),
('07:58:00', '17:00:00', '25660320', 1003),
('08:00:00', '17:00:00', '25660321', 1003),
('07:58:00', '17:00:00', '25660322', 1003),
('07:57:00', '17:00:00', '25660323', 1003),
('08:09:00', '17:00:00', '25660324', 1003),
('08:02:00', '17:00:00', '25660327', 1003),
('08:00:00', '17:00:00', '25660328', 1003),
('08:00:00', '17:00:00', '25660329', 1003),
('07:59:00', '17:00:00', '25660330', 1003),
('07:58:00', '17:00:00', '25660331', 1003);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(1) NOT NULL,
  `type_name` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`) VALUES
(1, 'ผู้ดูแล'),
(2, 'หัวหน้าแผนก'),
(3, 'ผู้ใช้งาน');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` varchar(12) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `type_id` int(1) NOT NULL,
  `emp_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `user_password`, `type_id`, `emp_id`) VALUES
('admin', '$2b$10$VlyE8kAq0gLYWhDfEYRZN.vO/4YmhqMuX6oq6s8NmAa2sCMFuzk26', 1, 1000),
('jakk', '$2b$10$XHZS0gQj.qw7H8TjoDFsgOKmJMISyKKG8gIyQ0lQnvCDK4i7JCZnm', 2, 1001),
('toto', '000', 1, 1002),
('dech', '000', 2, 1003);

-- --------------------------------------------------------

--
-- Table structure for table `workday`
--

CREATE TABLE `workday` (
  `work_id` varchar(8) NOT NULL,
  `work_date` date NOT NULL,
  `work_status` tinyint(1) NOT NULL
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
('25660331', '2023-03-31', 1),
('25660401', '2023-04-01', 1),
('25660403', '2023-04-03', 1),
('25660404', '2023-04-04', 1),
('25660405', '2023-04-05', 1),
('25660406', '2023-04-06', 1),
('25660407', '2023-04-07', 1),
('25660408', '2023-04-08', 1),
('25660410', '2023-04-10', 1),
('25660411', '2023-04-11', 1),
('25660412', '2023-04-12', 1),
('25660413', '2023-04-13', 1),
('25660414', '2023-04-14', 1),
('25660415', '2023-04-15', 1),
('25660417', '2023-04-17', 1),
('25660418', '2023-04-18', 1),
('25660419', '2023-04-19', 1),
('25660420', '2023-04-20', 1),
('25660421', '2023-04-21', 1),
('25660422', '2023-04-22', 1),
('25660424', '2023-04-24', 1),
('25660425', '2023-04-25', 1),
('25660426', '2023-04-26', 1),
('25660427', '2023-04-27', 1),
('25660428', '2023-04-28', 1),
('25660429', '2023-04-29', 1),
('25660501', '2023-05-01', 1),
('25660502', '2023-05-02', 1),
('25660503', '2023-05-03', 1),
('25660504', '2023-05-04', 1),
('25660505', '2023-05-05', 1),
('25660506', '2023-05-06', 1),
('25660508', '2023-05-08', 1),
('25660509', '2023-05-09', 1),
('25660510', '2023-05-10', 1),
('25660511', '2023-05-11', 1),
('25660512', '2023-05-12', 1),
('25660513', '2023-05-13', 1),
('25660515', '2023-05-15', 1),
('25660516', '2023-05-16', 1),
('25660517', '2023-05-17', 1),
('25660518', '2023-05-18', 1),
('25660519', '2023-05-19', 1),
('25660520', '2023-05-20', 1),
('25660522', '2023-05-22', 1),
('25660523', '2023-05-23', 1),
('25660524', '2023-05-24', 1),
('25660525', '2023-05-25', 1),
('25660526', '2023-05-26', 1),
('25660527', '2023-05-27', 1),
('25660529', '2023-05-29', 1),
('25660530', '2023-05-30', 1),
('25660531', '2023-05-31', 1),
('25660601', '2023-06-01', 1),
('25660602', '2023-06-02', 1),
('25660603', '2023-06-03', 1),
('25660605', '2023-06-05', 1),
('25660606', '2023-06-06', 1),
('25660607', '2023-06-07', 1),
('25660608', '2023-06-08', 1),
('25660609', '2023-06-09', 1),
('25660610', '2023-06-10', 1),
('25660612', '2023-06-12', 1),
('25660613', '2023-06-13', 1),
('25660614', '2023-06-14', 1),
('25660615', '2023-06-15', 1),
('25660616', '2023-06-16', 1),
('25660617', '2023-06-17', 1),
('25660619', '2023-06-19', 1),
('25660620', '2023-06-20', 1),
('25660621', '2023-06-21', 1),
('25660622', '2023-06-22', 1),
('25660623', '2023-06-23', 1),
('25660624', '2023-06-24', 1),
('25660626', '2023-06-26', 1),
('25660627', '2023-06-27', 1),
('25660628', '2023-06-28', 1),
('25660629', '2023-06-29', 1),
('25660630', '2023-06-30', 1),
('25660701', '2023-07-01', 1),
('25660703', '2023-07-03', 1),
('25660704', '2023-07-04', 1),
('25660705', '2023-07-05', 1),
('25660706', '2023-07-06', 1),
('25660707', '2023-07-07', 1),
('25660708', '2023-07-08', 1),
('25660710', '2023-07-10', 1),
('25660711', '2023-07-11', 1),
('25660712', '2023-07-12', 1),
('25660713', '2023-07-13', 1),
('25660714', '2023-07-14', 1),
('25660715', '2023-07-15', 1),
('25660717', '2023-07-17', 1),
('25660718', '2023-07-18', 1),
('25660719', '2023-07-19', 1),
('25660720', '2023-07-20', 1),
('25660721', '2023-07-21', 1),
('25660722', '2023-07-22', 1),
('25660724', '2023-07-24', 1),
('25660725', '2023-07-25', 1),
('25660726', '2023-07-26', 1),
('25660727', '2023-07-27', 1),
('25660728', '2023-07-28', 1),
('25660729', '2023-07-29', 1),
('25660731', '2023-07-31', 1),
('25660801', '2023-08-01', 1),
('25660802', '2023-08-02', 1),
('25660803', '2023-08-03', 1),
('25660804', '2023-08-04', 1),
('25660805', '2023-08-05', 1),
('25660807', '2023-08-07', 1),
('25660808', '2023-08-08', 1),
('25660809', '2023-08-09', 1),
('25660810', '2023-08-10', 1),
('25660811', '2023-08-11', 1),
('25660812', '2023-08-12', 1),
('25660814', '2023-08-14', 1),
('25660815', '2023-08-15', 1),
('25660816', '2023-08-16', 1),
('25660817', '2023-08-17', 1),
('25660818', '2023-08-18', 1),
('25660819', '2023-08-19', 1),
('25660821', '2023-08-21', 1),
('25660822', '2023-08-22', 1),
('25660823', '2023-08-23', 1),
('25660824', '2023-08-24', 1),
('25660825', '2023-08-25', 1),
('25660826', '2023-08-26', 1),
('25660828', '2023-08-28', 1),
('25660829', '2023-08-29', 1),
('25660830', '2023-08-30', 1),
('25660831', '2023-08-31', 1),
('25660901', '2023-09-01', 1),
('25660902', '2023-09-02', 1),
('25660904', '2023-09-04', 1),
('25660905', '2023-09-05', 1),
('25660906', '2023-09-06', 1),
('25660907', '2023-09-07', 1),
('25660908', '2023-09-08', 1),
('25660909', '2023-09-09', 1),
('25660911', '2023-09-11', 1),
('25660912', '2023-09-12', 1),
('25660913', '2023-09-13', 1),
('25660914', '2023-09-14', 1),
('25660915', '2023-09-15', 1),
('25660916', '2023-09-16', 1),
('25660918', '2023-09-18', 1),
('25660919', '2023-09-19', 1),
('25660920', '2023-09-20', 1),
('25660921', '2023-09-21', 1),
('25660922', '2023-09-22', 1),
('25660923', '2023-09-23', 1),
('25660925', '2023-09-25', 1),
('25660926', '2023-09-26', 1),
('25660927', '2023-09-27', 1),
('25660928', '2023-09-28', 1),
('25660929', '2023-09-29', 1),
('25660930', '2023-09-30', 1),
('25661002', '2023-10-02', 1),
('25661003', '2023-10-03', 1),
('25661004', '2023-10-04', 1),
('25661005', '2023-10-05', 1),
('25661006', '2023-10-06', 1),
('25661007', '2023-10-07', 1),
('25661009', '2023-10-09', 1),
('25661010', '2023-10-10', 1),
('25661011', '2023-10-11', 1),
('25661012', '2023-10-12', 1),
('25661013', '2023-10-13', 1),
('25661014', '2023-10-14', 1),
('25661016', '2023-10-16', 1),
('25661017', '2023-10-17', 1),
('25661018', '2023-10-18', 1),
('25661019', '2023-10-19', 1),
('25661020', '2023-10-20', 1),
('25661021', '2023-10-21', 1),
('25661023', '2023-10-23', 1),
('25661024', '2023-10-24', 1),
('25661025', '2023-10-25', 1),
('25661026', '2023-10-26', 1),
('25661027', '2023-10-27', 1),
('25661028', '2023-10-28', 1),
('25661030', '2023-10-30', 1),
('25661031', '2023-10-31', 1),
('25661101', '2023-11-01', 1),
('25661102', '2023-11-02', 1),
('25661103', '2023-11-03', 1),
('25661104', '2023-11-04', 1),
('25661106', '2023-11-06', 1),
('25661107', '2023-11-07', 1),
('25661108', '2023-11-08', 1),
('25661109', '2023-11-09', 1),
('25661110', '2023-11-10', 1),
('25661111', '2023-11-11', 1),
('25661113', '2023-11-13', 1),
('25661114', '2023-11-14', 1),
('25661115', '2023-11-15', 1),
('25661116', '2023-11-16', 1),
('25661117', '2023-11-17', 1),
('25661118', '2023-11-18', 1),
('25661120', '2023-11-20', 1),
('25661121', '2023-11-21', 1),
('25661122', '2023-11-22', 1),
('25661123', '2023-11-23', 1),
('25661124', '2023-11-24', 1),
('25661125', '2023-11-25', 1),
('25661127', '2023-11-27', 1),
('25661128', '2023-11-28', 1),
('25661129', '2023-11-29', 1),
('25661130', '2023-11-30', 1),
('25661201', '2023-12-01', 1),
('25661202', '2023-12-02', 1),
('25661204', '2023-12-04', 1),
('25661205', '2023-12-05', 1),
('25661206', '2023-12-06', 1),
('25661207', '2023-12-07', 1),
('25661208', '2023-12-08', 1),
('25661209', '2023-12-09', 1),
('25661211', '2023-12-11', 1),
('25661212', '2023-12-12', 1),
('25661213', '2023-12-13', 1),
('25661214', '2023-12-14', 1),
('25661215', '2023-12-15', 1),
('25661216', '2023-12-16', 1),
('25661218', '2023-12-18', 1),
('25661219', '2023-12-19', 1),
('25661220', '2023-12-20', 1),
('25661221', '2023-12-21', 1),
('25661222', '2023-12-22', 1),
('25661223', '2023-12-23', 1),
('25661225', '2023-12-25', 1),
('25661226', '2023-12-26', 1),
('25661227', '2023-12-27', 1),
('25661228', '2023-12-28', 1),
('25661229', '2023-12-29', 1),
('25661230', '2023-12-30', 1);

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
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

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
  MODIFY `dept_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1004;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
