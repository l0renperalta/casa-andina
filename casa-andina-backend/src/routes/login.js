const express = require('express');
const router = express.Router();
const pool = require('../connection');

router.post('/login', async (req, res) => {
  const { user, password } = req.body;

  try {
    const turista = await pool.query('SELECT * FROM turistas WHERE nombres = ?', [user]);
    const conductor = await pool.query('SELECT * FROM conductor WHERE nombres = ?', [user]);

    if (turista.length > 0 || conductor.length > 0) {
      if (turista.length > 0 && turista[0].dni === Number(password)) {
        let data = {
          id: turista[0].id,
          name: turista[0].nombres,
          adultos: turista[0].adultos,
          ninos: turista[0].ninos,
        };
        res.json({
          data,
          message: true,
          userType: 'turista',
        });
      }

      if (conductor.length > 0 && conductor[0].dni === Number(password)) {
        let data = {
          id: conductor[0].id,
          name: conductor[0].nombres,
        };
        res.json({
          data,
          message: true,
          userType: 'conductor',
        });
      }
    } else {
      res.json({
        message: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// Create a collection
// aws rekognition create-collection --collection-id casa-andina-faces

// Upload the image to the collection
// aws rekognition index-faces --collection-id casa-andina-faces --image-bytes fileb://imagen1.jpg

// Search if the face exists
// aws rekognition search-faces-by-image --collection-id casa-andina-faces --image-bytes fileb://imagen2.jpg

// ListCollections
// ListFaces
// CreateCollecion
// IndexFaces
// SearchFaceByImage

// AWS_REGION = us-east-2
// ACCESS_KEY = AKIAXFLWPONCC6QFXVVO
// SECRET_ACCESS_KEY = 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
