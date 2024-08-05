SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema green_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `green_db` DEFAULT CHARACTER SET utf8 ;
USE `green_db` ;

-- -----------------------------------------------------
-- Table `green_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_db`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `usertype` INT NOT NULL,
  PRIMARY KEY (`email`));


-- -----------------------------------------------------
-- Table `green_db`.`school`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_db`.`school` (
  `CUE` INT NOT NULL,
  `locality` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CUE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `green_db`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_db`.`course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course` VARCHAR(45) NOT NULL,
  `school_CUE` INT NOT NULL,
  PRIMARY KEY (`id`, `school_CUE`),
  INDEX `fk_course_school_idx` (`school_CUE` ASC) VISIBLE,
  CONSTRAINT `fk_course_school`
    FOREIGN KEY (`school_CUE`)
    REFERENCES `green_db`.`school` (`CUE`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `green_db`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_db`.`report` (
  `idreport` INT NOT NULL AUTO_INCREMENT,
  `desc_report` VARCHAR(45) NOT NULL,
  `course_id` INT NOT NULL,
  `course_school_CUE` INT NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `latitude` VARCHAR(255) NOT NULL,
  `longitude` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idreport`, `course_id`, `course_school_CUE`, `user_email`),
  INDEX `fk_report_course1_idx` (`course_id` ASC, `course_school_CUE` ASC) VISIBLE,
  INDEX `fk_report_user1_idx` (`user_email` ASC) VISIBLE,
  CONSTRAINT `fk_report_course1`
    FOREIGN KEY (`course_id` , `course_school_CUE`)
    REFERENCES `green_db`.`course` (`id` , `school_CUE`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_report_user1`
    FOREIGN KEY (`user_email`)
    REFERENCES `green_db`.`user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
