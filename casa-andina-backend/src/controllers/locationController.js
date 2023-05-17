const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { RekognitionClient, IndexFacesCommand, SearchFacesByImageCommand, ListCollectionsCommand } = require('@aws-sdk/client-rekognition');
const { AWS_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = require('../config');
const { v4: uuidv4 } = require('uuid');

const indexFace = async (req, res) => {
  if (!req.files && !req.files.face) {
    res.json('no files uploaded');
  }

  try {
    // Upload image to collection
    const clientRekognition = new RekognitionClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });
    const imageBuffer = Buffer.from(req.files.face.data, 'base64');
    const commandRekognition = new IndexFacesCommand({
      CollectionId: 'casa-andina-faces',
      ExternalImageId: uuidv4(),
      Image: {
        Bytes: imageBuffer,
      },
    });
    const responseRekognition = await clientRekognition.send(commandRekognition);

    // Upload image to S3
    const clientS3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });
    const commandPutObject = new PutObjectCommand({
      Bucket: 'casa-andina-faces',
      Key: uuidv4(),
      Body: imageBuffer,
    });
    const responseS3 = await clientS3.send(commandPutObject);

    console.log(responseRekognition);
    console.log(responseS3);
  } catch (error) {
    console.log(error);
  }
};

const searchFace = async (req, res) => {
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
    console.log(response);
    const { FaceMatches } = response;
    const faceFound = FaceMatches.some((face) => face.Similarity > 99.5);
    if (FaceMatches.length > 1) {
      res.json({
        faceFound,
      });
    } else {
      res.json({
        faceFound,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  indexFace,
  searchFace,
};
