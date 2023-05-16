const express = require('express');
const router = express.Router();
const { LocationClient, GetDevicePositionHistoryCommand } = require('@aws-sdk/client-location');
const { AWS_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = require('./config');

router.get('/location', async (req, res) => {
  try {
    const client = new LocationClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    const command = new GetDevicePositionHistoryCommand({
      TrackerName: 'TransportTracker', // required
      DeviceId: 'miDeviceId', // required
    });

    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
