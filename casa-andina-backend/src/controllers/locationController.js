const { LocationClient, BatchUpdateDevicePositionCommand, GetDevicePositionHistoryCommand, SearchPlaceIndexForTextCommand } = require('@aws-sdk/client-location');
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
    res.json({
      positions: DevicePositions,
    });
  } catch (error) {
    console.log(error);
  }
};

const searchPlaceByText = async (req, res) => {
  if (!req.body.place) {
    res.json({
      message: 'error',
    });
  } else {
    try {
      const client = new LocationClient({
        region: AWS_REGION,
        credentials: {
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
      });

      const input = {
        IndexName: 'casa-andina-index',
        Text: req.body.place,
        BiasPosition: [-71.5374, -16.409],
        FilterCountries: ['PER'],
      };
      const command = new SearchPlaceIndexForTextCommand(input);
      const response = await client.send(command);
      const location = response.Results[0].Place.Geometry.Point;
      res.json(location);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  updateLocation,
  getPositions,
  searchPlaceByText,
};

// aws location search-place-index-for-text --index-name casa-andina-index --text "calle ugarte" --filter-countries PER --bias-position ["-71.5374,-16.409"]
