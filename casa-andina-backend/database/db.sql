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
    conductor_id INT(11),
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    asientos INT(15) NOT NULL,
    CONSTRAINT fk_conductor FOREIGN KEY (conductor_id) REFERENCES conductor(id)
);
ALTER TABLE vehiculos
    ADD PRIMARY KEY (id);
ALTER TABLE vehiculos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE vehiculos;

-- Servicio table
CREATE TABLE servicio(
    id INT(11) NOT NULL,
    turista_id INT(11),
    adultos INT(15) NOT NULL,
    ninos INT(15) NOT NULL,
    ubicacion VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    hora_reserva INT(15) NOT NULL,
    CONSTRAINT fk_turista FOREIGN KEY (turista_id) REFERENCES turistas(id)
);

ALTER TABLE servicio
    ADD PRIMARY KEY (id);

ALTER TABLE servicio
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE servicio;

