const express = require('express');
const router = express.Router();

router.post('/registerTourist', async (req, res) => {
  console.log(req.body);
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
