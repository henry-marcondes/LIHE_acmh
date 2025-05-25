-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.32

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

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'public_site','0001_initial','2025-04-29 01:47:36.830672'),(2,'public_site','0002_product_product_name_alter_product_load_type','2025-04-29 01:47:36.874663');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `power` decimal(10,2) NOT NULL,
  `power_factor` decimal(10,2) NOT NULL,
  `width` decimal(10,2) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `depth` decimal(10,2) NOT NULL,
  `load_type` varchar(10) NOT NULL,
  `avaliable` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `voltage` decimal(10,2) NOT NULL,
  `tipo` char(2) NOT NULL,
  `Peso` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,80.00,1.00,77.00,67.00,2.50,'supply',1,'2025-04-29 03:06:55.000000','2025-04-29 03:06:55.000000','Placa Solar  80W',19.60,'DC',5.5),(2,100.00,1.00,67.00,120.00,2.50,'supply',1,'2025-04-29 03:14:11.000000','2025-04-29 03:14:11.000000','Placa Solar 100W peso',22.00,'DC',5),(3,340.00,1.00,88.00,187.00,3.00,'supply',1,'2025-04-29 03:22:15.000000','2025-04-29 03:22:15.000000','Placa Solar 340',0.00,'DC',11),(4,220.00,1.00,435.00,200.00,17.10,'supply',1,'2025-05-03 00:44:54.000000','2025-05-03 00:44:54.000000','Placa Solar  220W',29.10,'DC',8.6),(5,45.00,1.00,37.00,60.00,37.00,'source',1,'2025-05-03 00:49:32.000000','2025-05-03 00:49:32.000000','Geladeira  30L  Smart',12.00,'DC',11),(6,60.00,1.00,47.00,43.00,63.00,'source',1,'2025-05-03 00:54:35.000000','2025-05-03 00:54:35.000000','Geladeira 65L Hent',12.00,'DC',15),(7,65.00,1.00,34.00,69.00,52.00,'source',1,'2025-05-03 01:06:52.000000','2025-05-03 01:06:52.000000','Geladeira  50L Hent',12.00,'DC',13),(8,60.00,1.00,44.00,70.00,25.00,'source',1,'2025-05-03 01:12:06.000000','2025-05-03 01:12:06.000000','Geladeira Gaveta 20L',12.00,'DC',13),(9,83.80,1.00,70.00,90.00,33.00,'source',1,'2025-05-03 01:14:50.000000','2025-05-03 01:14:50.000000','Climatizador Resfriar Mod 601R6H-17083',12.00,'DC',18.7),(10,1200.00,1.00,77.00,109.00,41.50,'source',1,'2025-05-03 01:21:39.000000','2025-05-03 01:21:39.000000','Ar Condicionado Gen X7000',12.00,'DC',29),(11,12.00,1.00,16.00,16.00,10.00,'source',1,'2025-05-03 01:26:19.000000','2025-05-03 01:26:19.000000','Ventilador Lytiun Mod LY1206',12.00,'DC',0.76),(12,1000.00,0.20,9.50,21.50,5.50,'source',1,'2025-05-03 01:30:55.000000','2025-05-03 01:30:55.000000','Inversora 1000W 110V',12.00,'DC',1.8),(13,500.00,0.30,19.00,61.00,11.00,'source',1,'2025-05-03 01:38:15.000000','2025-05-03 01:38:15.000000','Inversora 500W 110V',12.00,'DC',1.3),(14,5400.00,1.00,27.00,52.00,24.00,'supply',1,'2025-05-03 01:41:59.000000','2025-05-03 01:41:59.000000','Bateria 450 A  XXtreme',12.00,'DC',54),(15,2880.00,1.00,28.00,53.00,24.50,'supply',1,'2025-05-03 01:45:32.000000','2025-05-03 01:45:32.000000','Bateria 240 A  Freedom',12.00,'DC',60),(16,1260.00,1.00,17.20,33.00,24.40,'supply',1,'2025-05-03 01:49:28.000000','2025-05-03 01:49:28.000000','Bateria 105 A  Moura',12.00,'DC',45),(17,600.00,1.00,17.50,21.00,17.50,'supply',1,'2025-05-03 01:51:47.000000','2025-05-03 01:51:47.000000','Bateria 50 A  Freedom',12.00,'DC',12),(18,2400.00,1.00,24.80,32.80,19.90,'supply',1,'2025-05-03 01:57:15.000000','2025-05-03 01:57:15.000000','Bateria Litiun 200 Lifepo4 Felicity Solar',12.00,'DC',8);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 20:02:24
