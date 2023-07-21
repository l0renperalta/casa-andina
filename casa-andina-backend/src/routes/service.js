const express = require('express');
const router = express.Router();
const pool = require('../connection');

router.post('/registerService', async (req, res) => {
  const { id, niños, adultos, ubicacion, destino, horaReserva } = req.body.values;
  const servicio = {
    turista_id: Number(id),
    adultos: Number(adultos),
    ninos: Number(niños),
    destino,
    ubicacion,
    hora_reserva: horaReserva,
  };

  console.log(servicio);
  await pool.query('INSERT INTO servicio set ?', [servicio]);
});

router.get('/getAvalibleServices', async (req, res) => {
  const services = await pool.query('SELECT * FROM servicio');
  // console.log(services);
  res.json(services);
});

router.get('/getConductorData', async (req, res) => {
  const conductor = await pool.query('SELECT * FROM conductor WHERE id = ?', [2]);
  const vehiculo = await pool.query('SELECT * FROM vehiculos WHERE id = ?', [2]);
  const data = { conductor: conductor[0], vehiculo: vehiculo[0] };
  res.json(data);
});

module.exports = router;
