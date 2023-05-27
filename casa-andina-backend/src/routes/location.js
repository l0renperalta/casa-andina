const express = require('express');
const router = express.Router();
const { updateLocation, getPositions, searchPlaceByText } = require('../controllers/locationController');

router.post('/updatePosition', updateLocation);
router.get('/getPositions', getPositions);
router.post('/searchPlaceByText', searchPlaceByText);

module.exports = router;

// aws location create-tracker --tracker-name transport-tracker
// aws location list-trackers
// aws location delete-tracker --tracker-name TransportTracker
