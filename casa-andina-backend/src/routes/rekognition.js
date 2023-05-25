const express = require('express');
const router = express.Router();
const { indexFace, searchFace } = require('../controllers/rekognitionController');

router.post('/indexFaces', indexFace);
router.post('/searchFaceByImage', searchFace);

module.exports = router;
