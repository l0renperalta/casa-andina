const { v4: uuidv4 } = require('uuid');
const pool = require('../connection');

const registerTourist = async (req, res) => {
  const { nombres, apellidos, dni, nacionalidad, niños, adultos } = req.body;
  const tourist = {
    nombres,
    apellidos,
    dni: Number(dni),
    nacionalidad,
    ninos: Number(niños),
    adultos: Number(adultos),
  };
  await pool.query('INSERT INTO turistas set ?', [tourist]);
};

const registerConductor = async (req, res) => {
  const { nombres, apellidos, dni, marca, modelo, placa, color, asientos } = req.body;
  const conductor = {
    nombres,
    apellidos,
    dni: Number(dni),
  };
  const vehicle = {
    marca,
    modelo,
    placa,
    color,
    asientos: Number(asientos),
  };

  await pool.query('INSERT INTO conductor set ?', [conductor]);
  await pool.query('INSERT INTO vehiculos set ?', [vehicle]);
};

module.exports = {
  registerTourist,
  registerConductor,
};
