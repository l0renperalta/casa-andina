const express = require('express');
const router = express.Router();
const { LocationClient, GetDevicePositionHistoryCommand } = require('@aws-sdk/client-location');

router.get('/location', async (req, res) => {
  const config = {
    region: 'us-east-1',
    // credentials: {
    //   accessKeyId: 'TU_ACCESS_KEY_ID',
    //   secretAccessKey: 'TU_SECRET_ACCESS_KEY',
    // },
  };

  const client = new LocationClient(config);

  const input = {
    // GetDevicePositionHistoryRequest
    TrackerName: 'TransportTracker', // required
    DeviceId: 'STRING_VALUE', // required
  };

  const command = new GetDevicePositionHistoryCommand(input);
  const response = await client.send(command);
  res.json(response);
});

module.exports = router;
