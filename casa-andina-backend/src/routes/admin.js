const express = require('express');
const router = express.Router();
const { registerTourist, registerConductor } = require('../controllers/adminController');

router.post('/registerTourist', registerTourist);
router.post('/registerConductor', registerConductor);

module.exports = router;

// aws location create-tracker --tracker-name transport-tracker
// aws location list-trackers
// aws location delete-tracker --tracker-name TransportTracker
