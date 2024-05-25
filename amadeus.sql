SET sql_notes = 0;
-- Volcando estructura de base de datos para amadeus
DROP DATABASE IF EXISTS `amadeus`;
CREATE DATABASE IF NOT EXISTS `amadeus`;
USE `amadeus`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE admin (
    id INT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100)
);

DROP TABLE IF EXISTS `instrumento`;
CREATE TABLE instrumento (
    id INT PRIMARY KEY,
    nombre VARCHAR(100)
);

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE alumno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    password VARCHAR(100),
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    curso INT,
    instrumento INT
);

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE profesor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    password VARCHAR(100),
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    instrumento INT
);

DROP TABLE IF EXISTS `clase`;
CREATE TABLE clase (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dia VARCHAR(100),
    hora VARCHAR(100),
    id_alumno INT,
    id_profesor INT
);

DROP TABLE IF EXISTS `tarea`;
CREATE TABLE tarea (
    id INT PRIMARY KEY AUTO_INCREMENT,
    publicacion DATETIME,
    entrega DATETIME,
    id_alumno INT,
    id_profesor INT,
    descripcion VARCHAR(250),
    completada BOOLEAN
);

DROP TABLE IF EXISTS `nota`;
CREATE TABLE nota (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    calificacion DOUBLE,
    id_alumno INT,
    id_profesor INT
);

DROP TABLE IF EXISTS `admision`;
CREATE TABLE admision (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_alumno INT,
    apto BOOLEAN,
    no_apto BOOLEAN,
    instrumento INT
);

DROP TABLE IF EXISTS `audicion`;
CREATE TABLE audicion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    instrumento INT,
    dia_hora DATETIME
);

-- Volcando datos para la tabla amadeus.admision:
DELETE FROM `admision`;
INSERT INTO `admision` (`id`, `id_alumno`, `apto`, `no_apto`, `instrumento`) VALUES
	(1, 1, false, false, 1);

-- Volcando datos para la tabla amadeus.alumno:
DELETE FROM `admin`;
INSERT INTO `admin` (`id`, `email`, `password`) VALUES
	(1, 'ivantladmin@gmail.com', '1234');

-- Volcando datos para la tabla amadeus.instrumento:
DELETE FROM `instrumento`;
INSERT INTO `instrumento` (`id`, `nombre`) VALUES
	(1, 'Piano'),
    (2, 'Guitarra'),
    (3, 'Clarinete'),
    (4, 'Saxofón'),
    (5, 'Flauta'),
    (6, 'Trompeta'),
    (7, 'Bombardino'),
    (8, 'Tuba'),
    (9, 'Trombón'),
    (10, 'Canto');

-- Volcando datos para la tabla amadeus.alumno:
DELETE FROM `alumno`;
INSERT INTO `alumno` (`id`, `email`, `password`, `nombre`,`apellidos`,`curso`, `instrumento`) VALUES
	(1, 'albertodm@gmail.com', 'user', 'Alberto', 'Díaz Muñoz', 4, 8),
	(2, 'jonathanbg@gmail.com', 'user', 'Jonathan', 'Barreiro Gómez', 4, 4),
	(3, 'mariatg@gmail.com', 'user', 'María', 'Torres González', 3, 5),
	(4, 'jorgeantonioap@gmail.com', 'user', 'Jorge Antonio', 'Aranburu Pazos', 3, 1),
	(5, 'mariajosegm@gmail.com', 'user', 'María José', 'Garrido Martínez', 2, 3),
	(6, 'antoniagg@gmail.com', 'user', 'Antonia', 'Grajales García', 2, 1),
	(7, 'lucasrj@gmail.com', 'user', 'Lucas', 'Rodríguez Jiménez', 1, -1),
	(8, 'alonsobc@gmail.com', 'user', 'Alonso', 'Bazaga Cuesta', 1, -1),
	(9, 'aliciaro@gmail.com', 'user', 'Alicia', 'Robles Olmedo', 1, -1),
    (10, 'federicocl@gmail.com', 'user', 'Federico', 'Cebrián López', 1, -1);

-- Volcando datos para la tabla amadeus.alumno:
DELETE FROM `profesor`;
INSERT INTO `profesor` (`id`, `email`, `password`, `nombre`, `apellidos`, `instrumento`) VALUES
	(1, 'juanjosegr@gmail.com', 'user', 'Juan José', 'Gil Ramos', 1),
    (2, 'miguelng@gmail.com', 'user', 'Miguel', 'Navarro Gómez', 2),
    (3, 'carmenainhoang@gmail.com', 'user', 'Carmen Ainhoa', 'Núñez González', 3),
    (4, 'aliciarm@gmail.com', 'user', 'Alicia', 'Romero Molina', 4),
    (5, 'laurabr@gmail.com', 'user', 'Laura', 'Blanco Rivas', 5),
    (6, 'pilarso@gmail.com', 'user', 'Pilar', 'Suárez Ortega', 6),
    (7, 'ivantl@gmail.com', 'user', 'Iván', 'Torres López', 7),
    (8, 'albertoms@gmail.com', 'user', 'Alberto', 'Muñoz Sánchez', 8),
    (9, 'ricardorm@gmail.com', 'user', 'Ricardo', 'Rubio Morales', 9),
    (10, 'claral@gmail.com', 'user', 'Clara', 'Lennon', 10);
    