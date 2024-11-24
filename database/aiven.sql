-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: green-alert-greenalert.h.aivencloud.com    Database: green_db
-- ------------------------------------------------------
-- Server version       8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0ad042b4-54b3-11ef-9fc0-2a584eaaaa2a:1-115,
d269b077-29bf-11ef-93c7-ee34da0ba225:1-88';

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher` varchar(255) NOT NULL,
  `school_CUE` varchar(15) NOT NULL,
  `course` varchar(45) NOT NULL,
  `inv_code` varchar(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inv_code_UNIQUE` (`inv_code`),
  KEY `fk_course_school1_idx` (`school_CUE`),
  KEY `fk_course_user1_idx` (`teacher`),
  CONSTRAINT `fk_course_school1` FOREIGN KEY (`school_CUE`) REFERENCES `school` (`CUE`) ON UPDATE CASCADE,
  CONSTRAINT `fk_course_user1` FOREIGN KEY (`teacher`) REFERENCES `user` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (2,'aieta@gmail.com','12345678','7mo 2da Programacion','pedilo');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locality`
--

DROP TABLE IF EXISTS `locality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locality` (
  `idlocality` int NOT NULL,
  `locality_name` varchar(50) NOT NULL,
  PRIMARY KEY (`idlocality`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locality`
--

LOCK TABLES `locality` WRITE;
/*!40000 ALTER TABLE `locality` DISABLE KEYS */;
INSERT INTO `locality` VALUES (1,'Monte Grande');
/*!40000 ALTER TABLE `locality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `idreport` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `course_id` int NOT NULL,
  `locality` int NOT NULL,
  `type_report` int NOT NULL,
  `desc_report` varchar(200) NOT NULL,
  `latitude` double NOT NULL,
  `length` double NOT NULL,
  PRIMARY KEY (`idreport`),
  KEY `fk_report_user1_idx` (`user_email`),
  KEY `fk_report_course1_idx` (`course_id`),
  KEY `fk_report_report_type_idx` (`type_report`),
  KEY `fk_report_locality1_idx` (`locality`),
  CONSTRAINT `fk_report_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_report_locality1` FOREIGN KEY (`locality`) REFERENCES `locality` (`idlocality`) ON UPDATE CASCADE,
  CONSTRAINT `fk_report_report_type1` FOREIGN KEY (`type_report`) REFERENCES `report_type` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_report_user1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (3,'aieta@gmail.com',2,1,19,'Ejemplo',-34.61215985581049,-418.4691524505616),(4,'avalos@gmail.com',2,1,6,'Exceso de contaminacion',-34.631371716426784,-418.4185123443604);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_type`
--

DROP TABLE IF EXISTS `report_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_type` (
  `id` int NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_type`
--

LOCK TABLES `report_type` WRITE;
/*!40000 ALTER TABLE `report_type` DISABLE KEYS */;
INSERT INTO `report_type` VALUES (1,'Contaminación del aire'),(2,'Contaminación del agua'),(3,'Deforestación'),(4,'Residuos sólidos'),(5,'Erosión del suelo'),(6,'Pérdida de biodiversidad'),(7,'Ruido ambiental'),(8,'Uso excesivo de recursos naturales'),(9,'Cambio climático'),(10,'Desastres naturales'),(11,'Contaminación por plásticos'),(12,'Desertificación'),(13,'Contaminación del suelo'),(14,'Mal manejo de residuos tóxicos'),(15,'Sobrepesca'),(16,'Quema de combustibles fósiles'),(17,'Acidificación de los océanos'),(18,'Urbanización no planificada'),(19,'Desperdicio de agua'),(20,'Destrucción de hábitats');
/*!40000 ALTER TABLE `report_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `CUE` varchar(15) NOT NULL,
  `name_school` varchar(100) NOT NULL,
  `locality` int NOT NULL,
  PRIMARY KEY (`CUE`),
  KEY `fk_school_locality1_idx` (`locality`),
  CONSTRAINT `fk_school_locality1` FOREIGN KEY (`locality`) REFERENCES `locality` (`idlocality`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES ('12345678','EESTN1 EE',1);
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(70) NOT NULL,
  `usertype` int NOT NULL,
  `course_id` int DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `fk_user_course1_idx` (`course_id`),
  CONSTRAINT `fk_user_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('clean-cut-visit','aieta@gmail.com','$2a$10$Io3n5jzgHGJ/c0oyL.Zah..O5guvx5n5Si6Ri0VTbHsosSiqss0oW',0,NULL),('cheap-language7','ancasi@gmail.com','$2a$10$uGwEX./0v0GwG.HvgaljHeXoCuzQ7sO7pDEEyzRj3707cF0yCn72y',2,NULL),('yielding-multip','avalos@gmail.com','$2a$10$ZxkcwJF11tG3d5bGYbto/u5LCz4xdndrS5fMC6Y8MExEaS4DEI7yW',0,NULL),('metaphoric-hoax','brian@brian.com','$2a$10$R2zT6Ocxb1e8JWz3MTZ0w.fttHwGNoWPIwrOH7DV2n7cmWrOOBwGG',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

ALTER TABLE school
ADD COLUMN director_email VARCHAR(255);

ALTER TABLE school
ADD CONSTRAINT director_school_fk
FOREIGN KEY (director_email) REFERENCES user(email);


ALTER TABLE report
ADD COLUMN validated ENUM('unseen', 'accepted', 'denied') DEFAULT 'unseen';

DROP TABLE IF EXISTS `teacher_school`;
CREATE TABLE teacher_school (
    teacher_email VARCHAR(255) NOT NULL,
    school_cue VARCHAR(15) NOT NULL,
    PRIMARY KEY (teacher_email, school_cue),
    KEY `fk_teacher_school_school1_idx` (school_cue),
    KEY `fk_teacher_school_teacher1_idx` (teacher_email),
    CONSTRAINT `teacher_school_teacher_email` FOREIGN KEY (teacher_email) REFERENCES user(email),
    CONSTRAINT `teacher_school_school_cue` FOREIGN KEY (school_cue) REFERENCES school(CUE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;