const express = require('express');
const router = express.Router();
const { updateTransportLocation, getPositions, searchPlaceByText, searchPlaceByCoordinates } = require('../controllers/locationController');

router.post('/searchPlaceByText', searchPlaceByText);
router.post('/searchPlaceByCoordinates', searchPlaceByCoordinates);
router.post('/updateTransportLocation', updateTransportLocation);
router.get('/getPositions', getPositions);

module.exports = router;

// aws location create-tracker --tracker-name transport-tracker
// aws location list-trackers
// aws location delete-tracker --tracker-name TransportTracker
