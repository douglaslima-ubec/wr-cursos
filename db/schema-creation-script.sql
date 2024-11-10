CREATE DATABASE  IF NOT EXISTS `wrcursos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `wrcursos`;
-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: wrcursos
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_curso`
--

DROP TABLE IF EXISTS `tb_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_curso` (
  `curso_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `carga_horaria` int(11) NOT NULL,
  `preco` decimal(15,2) NOT NULL,
  `modalidade` varchar(255) DEFAULT NULL,
  `esta_publicado` tinyint(1) NOT NULL DEFAULT 0,
  `criado_em` datetime NOT NULL DEFAULT current_timestamp(),
  `criado_por` int(11) NOT NULL,
  PRIMARY KEY (`curso_id`),
  KEY `fk_tb_curso_tb_usuario` (`criado_por`),
  CONSTRAINT `fk_tb_curso_tb_usuario` FOREIGN KEY (`criado_por`) REFERENCES `tb_usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_curso`
--

LOCK TABLES `tb_curso` WRITE;
/*!40000 ALTER TABLE `tb_curso` DISABLE KEYS */;
INSERT INTO `tb_curso` VALUES (1,'Back-end em NodeJS','Aprenda NodeJS de uma vez',80,159.90,NULL,1,'2024-11-10 00:00:00',1);
/*!40000 ALTER TABLE `tb_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_curso_instrutores`
--

DROP TABLE IF EXISTS `tb_curso_instrutores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_curso_instrutores` (
  `curso_id` int(11) NOT NULL,
  `instrutor_id` int(11) NOT NULL,
  KEY `fk_tb_curso_instrutores_tb_curso` (`curso_id`),
  KEY `fk_tb_curso_instrutores_tb_instrutor` (`instrutor_id`),
  CONSTRAINT `fk_tb_curso_instrutores_tb_curso` FOREIGN KEY (`curso_id`) REFERENCES `tb_curso` (`curso_id`),
  CONSTRAINT `fk_tb_curso_instrutores_tb_instrutor` FOREIGN KEY (`instrutor_id`) REFERENCES `tb_instrutor` (`instrutor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_curso_instrutores`
--

LOCK TABLES `tb_curso_instrutores` WRITE;
/*!40000 ALTER TABLE `tb_curso_instrutores` DISABLE KEYS */;
INSERT INTO `tb_curso_instrutores` VALUES (1,1);
/*!40000 ALTER TABLE `tb_curso_instrutores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_curso_temas`
--

DROP TABLE IF EXISTS `tb_curso_temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_curso_temas` (
  `curso_id` int(11) NOT NULL,
  `tema_id` int(11) NOT NULL,
  KEY `fk_tb_curso_temas_tb_curso` (`curso_id`),
  KEY `fk_tb_curso_temas_tb_tema` (`tema_id`),
  CONSTRAINT `fk_tb_curso_temas_tb_curso` FOREIGN KEY (`curso_id`) REFERENCES `tb_curso` (`curso_id`),
  CONSTRAINT `fk_tb_curso_temas_tb_tema` FOREIGN KEY (`tema_id`) REFERENCES `tb_tema` (`tema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_curso_temas`
--

LOCK TABLES `tb_curso_temas` WRITE;
/*!40000 ALTER TABLE `tb_curso_temas` DISABLE KEYS */;
INSERT INTO `tb_curso_temas` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `tb_curso_temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_instrutor`
--

DROP TABLE IF EXISTS `tb_instrutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_instrutor` (
  `instrutor_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`instrutor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_instrutor`
--

LOCK TABLES `tb_instrutor` WRITE;
/*!40000 ALTER TABLE `tb_instrutor` DISABLE KEYS */;
INSERT INTO `tb_instrutor` VALUES (1,'Adriana Falcomer','Professora de banco de dados');
/*!40000 ALTER TABLE `tb_instrutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_perfil`
--

DROP TABLE IF EXISTS `tb_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_perfil` (
  `perfil_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`perfil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_perfil`
--

LOCK TABLES `tb_perfil` WRITE;
/*!40000 ALTER TABLE `tb_perfil` DISABLE KEYS */;
INSERT INTO `tb_perfil` VALUES (1,'ADMIN','Administrador'),(2,'USER','Usuário');
/*!40000 ALTER TABLE `tb_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tema`
--

DROP TABLE IF EXISTS `tb_tema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_tema` (
  `tema_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tema_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tema`
--

LOCK TABLES `tb_tema` WRITE;
/*!40000 ALTER TABLE `tb_tema` DISABLE KEYS */;
INSERT INTO `tb_tema` VALUES (1,'API RESTful','Aprenda a desenvolver API RESTful'),(2,'Back-end','Aprenda desenvolvimento back-end');
/*!40000 ALTER TABLE `tb_tema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_usuario` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cep` char(8) DEFAULT NULL,
  `uf` char(2) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) DEFAULT NULL,
  `rua` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `alterar_senha` tinyint(1) NOT NULL DEFAULT 1,
  `expira_em` date NOT NULL DEFAULT (curdate() + interval 1 year),
  `esta_ativo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES (1,'Douglas Souza de Lima',NULL,NULL,NULL,NULL,NULL,NULL,'douglaslima-pro@outlook.com','douglas123',1,'2025-11-10',1);
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario_perfis`
--

DROP TABLE IF EXISTS `tb_usuario_perfis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_usuario_perfis` (
  `usuario_id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  KEY `fk_tb_usuario_perfis_tb_usuario` (`usuario_id`),
  KEY `fk_tb_usuario_perfis_tb_perfil` (`perfil_id`),
  CONSTRAINT `fk_tb_usuario_perfis_tb_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `tb_perfil` (`perfil_id`),
  CONSTRAINT `fk_tb_usuario_perfis_tb_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `tb_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario_perfis`
--

LOCK TABLES `tb_usuario_perfis` WRITE;
/*!40000 ALTER TABLE `tb_usuario_perfis` DISABLE KEYS */;
INSERT INTO `tb_usuario_perfis` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `tb_usuario_perfis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-10 18:20:59
