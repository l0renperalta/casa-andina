const express = require('express');
const router = express.Router();
const pool = require('../connection');

router.post('/login', async (req, res) => {
  const { user, password } = req.body;

  try {
    const values = await pool.query('SELECT * FROM turistas WHERE nombres = ?', [user]);
    let data = {
      name: '',
      adultos: 0,
      ninos: 0,
    };

    if (values.length > 0 && values[0].dni === Number(password)) {
      data = {
        name: values[0].nombres,
        adultos: values[0].adultos,
        ninos: values[0].ninos,
      };
      res.json({
        data,
        message: true,
      });
    } else {
      res.json({
        data,
        message: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

// Create a collection
// aws rekognition create-collection --collection-id casa-andina-faces

// Upload the image to the collection
// aws rekognition index-faces --collection-id casa-andina-faces --image-bytes fileb://imagen1.jpg

// Search if the face exists
// aws rekognition search-faces-by-image --collection-id casa-andina-faces --image-bytes fileb://imagen2.jpg

// List all faces located on the collection
// aws rekognition list-faces --collection-id casa-andina-faces

// ListCollections
// ListFaces
// CreateCollecion
// IndexFaces
// SearchFaceByImage

// AWS_REGION = us-east-2
// ACCESS_KEY = AKIAXFLWPONCC6QFXVVO
// SECRET_ACCESS_KEY = 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
