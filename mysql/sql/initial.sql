CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mysql_alfred` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mysql_alfred`;

DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `confirmed_at` timestamp NULL DEFAULT NULL,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE `customer` 
(
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	FOREIGN KEY (user_id) REFERENCES user(id)
);


INSERT INTO `user` VALUES
(1,'admin','admin@alfred.local','$2a$10$hsI8NI704Sst1Sc8WWU4d.nvJPZs4pNNvg5OM4aD6Oo3V5Lznroa.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2,'user','user@alfred.local','$2a$10$hsI8NI704Sst1Sc8WWU4d.nvJPZs4pNNvg5OM4aD6Oo3V5Lznroa.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO `customer` VALUES
(1,1,'Lucien Bramard','oss117.LB@gmail.com','0612363329',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2,1,'Noël Flantier','oss117.NF@gmail.com','0450439625',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3,1,'Hubert Bonisseur de la Bath','oss117@gouv.fr','0450389625',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4,2,'Lucien Bramard','oss117.LB@gmail.com','0612363329',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5,2,'Noël Flantier','oss117.NF@gmail.com','0450439625',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6,2,'Hubert Bonisseur de la Bath','oss117@gouv.fr','0450389625',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7,2,'Hubert Bonisseur de la Bath','oss117@gouv.fr','0450389625',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8,2,'Hubert Bonisseur de la Bath','oss117@gouv.fr','0450389625',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	    
