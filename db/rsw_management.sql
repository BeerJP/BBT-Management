-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2023 at 03:17 PM
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
  `emp_status` tinyint(1) DEFAULT NULL,
  `emp_startdate` date NOT NULL,
  `emp_enddate` date DEFAULT NULL,
  `emp_mac1` varchar(17) NOT NULL,
  `emp_mac2` varchar(17) NOT NULL,
  `dept_id` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `holi_month` int(2) NOT NULL,
  `holi_name` varchar(50) NOT NULL,
  `holi_date` date NOT NULL,
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
  `leave_status` tinyint(1) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `type_id` int(1) NOT NULL,
  `type_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD KEY `dept_id` (`dept_id`),
  ADD KEY `dept_id_2` (`dept_id`);

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD KEY `type_id` (`type_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
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
  MODIFY `dept_id` int(1) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `type_id` int(1) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
