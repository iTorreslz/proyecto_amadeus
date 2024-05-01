SET sql_notes = 0;
-- Volcando estructura de base de datos para amadeus
DROP DATABASE IF EXISTS `amadeus`;
CREATE DATABASE IF NOT EXISTS `amadeus`;
USE `amadeus`;

DROP TABLE IF EXISTS `instrumento`;
CREATE TABLE instrumento (
    id INT PRIMARY KEY,
    nombre VARCHAR(100)
);

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE alumno (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    curso INT
);

DROP TABLE IF EXISTS `alumno_instrumento`;
CREATE TABLE alumno_instrumento (
    id_alumno INT,
    id_instrumento INT,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id),
    FOREIGN KEY (id_instrumento) REFERENCES instrumento(id),
    PRIMARY KEY (id_alumno, id_instrumento)
);

DROP TABLE IF EXISTS `nota_alumno`;
CREATE TABLE nota_alumno (
    id_alumno INT,
    nota INT,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id)
);

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE profesor (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    instrumento INT,
    FOREIGN KEY (instrumento) REFERENCES instrumento(id)
);

DROP TABLE IF EXISTS `clase`;
CREATE TABLE clase (
    id INT PRIMARY KEY,
    dia_hora DATETIME,
    id_alumno INT,
    id_profesor INT,
    duracion TIME,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id),
    FOREIGN KEY (id_profesor) REFERENCES profesor(id)
);

DROP TABLE IF EXISTS `nota`;
CREATE TABLE nota (
    id INT PRIMARY KEY,
    calificacion DOUBLE,
    id_alumno INT,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id)
);

DROP TABLE IF EXISTS `admision`;
CREATE TABLE admision (
    id INT PRIMARY KEY,
    id_alumno INT,
    decision BOOLEAN,
    instrumento INT,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id),
    FOREIGN KEY (instrumento) REFERENCES instrumento(id)
);

DROP TABLE IF EXISTS `audicion`;
CREATE TABLE audicion (
    id INT PRIMARY KEY,
    dia_hora DATETIME
);

DROP TABLE IF EXISTS `audicion_alumno`;
CREATE TABLE audicion_alumno (
    audicion_id INT,
    alumno_id INT,
    FOREIGN KEY (audicion_id) REFERENCES audicion(id),
    FOREIGN KEY (alumno_id) REFERENCES alumno(id),
    PRIMARY KEY (audicion_id, alumno_id)
);

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
INSERT INTO `alumno` (`id`, `nombre`,`apellidos`,`curso`) VALUES
	(1, 'Alberto', 'Díaz Muñoz', 4),
	(2, 'Jonathan', 'Barreiro Gómez', 4),
	(3, 'María', 'Torres González', 3),
	(4, 'Jorge Antonio', 'Aranburu Pazos', 3),
	(5, 'María José', 'Garrido Martínez', 2),
	(6, 'Antonia', 'Grajales García', 2),
	(7, 'Lucas', 'Rodríguez Jiménez', 1),
	(8, 'Alonso', 'Bazaga Cuesta', 1),
	(9, 'Alicia', 'Robles Olmedo', 1),
    (10, 'Federico', 'Cebrián López', 1);

-- Volcando datos para la tabla amadeus.alumno:
DELETE FROM `profesor`;
INSERT INTO `profesor` (`id`, `nombre`, `apellidos`, `instrumento`) VALUES
	(1, 'Juan José', 'Gil Ramos', '1'),
    (2, 'Miguel', 'Navarro Gómez', '2'),
    (3, 'Carmen Ainhoa', 'Núñez González', '3'),
    (4, 'Alicia', 'Romero Molina', '4'),
    (5, 'Laura', 'Blanco Rivas', '5'),
    (6, 'Pilar', 'Suárez Ortega', '6'),
    (7, 'Iván', 'Torres López', '7'),
    (8, 'Alberto', 'Muñoz Sánchez', '8'),
    (9, 'Ricardo', 'Rubio Morales', '9'),
    (10, 'Clara', 'Lennon', '10');
    