CREATE DATABASE db_casa_andina;

use db_casa_andina;

-- Turistas table
CREATE TABLE turistas(
    id INT(11) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    dni INT(15) NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL,
    adultos INT(15) NOT NULL,
    ninos INT(15) NOT NULL
);
ALTER TABLE turistas
    ADD PRIMARY KEY (id);
ALTER TABLE turistas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE turistas;

-- Conductor table
CREATE TABLE conductor(
    id INT(11) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    dni INT(15) NOT NULL
);
ALTER TABLE conductor
    ADD PRIMARY KEY (id);
ALTER TABLE conductor
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE conductor;

-- Vehiculo table
CREATE TABLE vehiculos(
    id INT(11) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    asientos INT(15) NOT NULL
);
ALTER TABLE vehiculos
    ADD PRIMARY KEY (id);
ALTER TABLE vehiculos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE vehiculos;

