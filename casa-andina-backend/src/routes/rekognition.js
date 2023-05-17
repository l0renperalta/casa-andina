const express = require('express');
const router = express.Router();
const { indexFace, searchFace } = require('../controllers/locationController');

router.post('/indexFaces', indexFace);
router.post('/searchFaceByImage', searchFace);

module.exports = router;
