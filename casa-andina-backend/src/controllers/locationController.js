const { LocationClient, BatchUpdateDevicePositionCommand, GetDevicePositionHistoryCommand } = require('@aws-sdk/client-location');
const { AWS_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = require('../config');

const updateLocation = async (req, res) => {
  try {
    const client = new LocationClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    const input = {
      TrackerName: 'transport-tracker',
      Updates: [
        {
          DeviceId: 'transport1',
          SampleTime: new Date(),
          Position: [-16.403712553200855, -71.54930341976161],
        },
      ],
    };
    const command = new BatchUpdateDevicePositionCommand(input);
    const response = await client.send(command);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const getPositions = async (req, res) => {
  try {
    const client = new LocationClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    const input = {
      TrackerName: 'transport-tracker',
      DeviceId: 'transport1',
    };
    const command = new GetDevicePositionHistoryCommand(input);
    const response = await client.send(command);
    const { DevicePositions } = response;
    console.log(DevicePositions);
    res.json({
      positions: DevicePositions,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateLocation,
  getPositions,
};
