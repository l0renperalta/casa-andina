const { v4: uuidv4 } = require('uuid');
const pool = require('../connection');

const registerTourist = async (req, res) => {
  const { nombres, apellidos, dni, nacionalidad, niños, adultos } = req.body;
  const tourist = {
    id: uuidv4(),
    nombres,
    apellidos,
    dni: Number(dni),
    nacionalidad,
    ninos: Number(niños),
    adultos: Number(adultos),
  };
  await pool.query('INSERT INTO turistas set ?', [tourist]);
  console.log(tourist);
};

const registerConductor = async (req, res) => {
  const { nombres, apellidos, dni, marca, modelo, placa, color, asientos } = req.body;
  const conductor = {
    id: uuidv4(),
    nombres,
    apellidos,
    dni: Number(dni),
  };
  const vehicle = {
    id: uuidv4(),
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
