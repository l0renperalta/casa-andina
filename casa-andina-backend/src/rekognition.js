const express = require('express');
const router = express.Router();
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
const { RekognitionClient, IndexFacesCommand, SearchFacesByImageCommand, ListCollectionsCommand } = require('@aws-sdk/client-rekognition');
const { AWS_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = require('./config');

router.get('/buckets', async (req, res) => {
  try {
    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    const input = {};
    const command = new ListBucketsCommand(input);
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

router.post('/indexFaces', async (req, res) => {
  if (!req.files && !req.files.face) {
    res.json('no files uploaded');
  } else {
    console.log(req.files);
  }

  try {
    const client = new RekognitionClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    // const imageUint8Array = new Uint8Array(req.files.face.data);
    // const imageBase64 = req.files.face.data.toString('base64');
    // const imageBuffer = loadImageIntoBuffer(imageBase64);
    const imageBuffer = Buffer.from(req.files.face.data, 'base64');

    const input = {
      // IndexFacesRequest
      CollectionId: 'casa-andina-faces',
      Image: {
        Bytes: imageBuffer,
      },
    };

    const command = new IndexFacesCommand(input);
    const response = await client.send(command);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post('/searchFaceByImage', async (req, res) => {
  if (!req.files && !req.files.face) {
    res.json('no files uploaded');
  }

  try {
    const client = new RekognitionClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    // const imageUint8Array = new Uint8Array(req.files.face.data);
    // const imageBase64 = req.files.face.data.toString('base64');
    // const imageBuffer = loadImageIntoBuffer(imageBase64);
    const imageBuffer = Buffer.from(req.files.face.data, 'base64');

    const input = {
      CollectionId: 'casa-andina-faces',
      Image: {
        Bytes: imageBuffer,
      },
    };

    const command = new SearchFacesByImageCommand(input);
    const response = await client.send(command);
    res.json(response);
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

// List all faces located on the collection
// aws rekognition list-faces --collection-id casa-andina-faces

// ListCollections
// ListFaces
// CreateCollecion
// IndexFaces
// SearchFaceByImage
