const express = require('express');
const router = express.Router();
const pool = require('../connection');

router.post('/registerService', async (req, res) => {
  console.log(req.body);
  const { id, niños, adultos, ubicacion, destino } = req.body.values;
  const servicio = {
    turista_id: Number(id),
    adultos: Number(adultos),
    ninos: Number(niños),
    destino,
    ubicacion,
  };

  // console.log(servicio);
  await pool.query('INSERT INTO servicio set ?', [servicio]);
});

router.get('/getAvalibleServices', async (req, res) => {
  const services = await pool.query('SELECT * FROM servicio');
  // console.log(services);
  res.json(services);
});

module.exports = router;
