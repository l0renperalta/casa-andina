const {
  LocationClient,
  BatchUpdateDevicePositionCommand,
  GetDevicePositionHistoryCommand,
  SearchPlaceIndexForTextCommand,
  SearchPlaceIndexForPositionCommand,
} = require('@aws-sdk/client-location');
const { AWS_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = require('../config');

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
        BiasPosition: [-71.53147220763623, -16.398995818103476],
        Text: req.body.place,
        FilterCountries: ['PER'],
        MaxResults: 5,
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

const searchPlaceByCoordinates = async (req, res) => {
  const { latitude, longitude } = req.body.coordinates;
  try {
    const client = new LocationClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    const input = {
      // SearchPlaceIndexForPositionRequest
      IndexName: 'casa-andina-index', // required
      Position: [longitude, latitude],
    };
    const command = new SearchPlaceIndexForPositionCommand(input);
    const response = await client.send(command);
    const data = response.Results[0].Place.Label;
    res.json({
      location: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTransportLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const client = new LocationClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    const input = {
      TrackerName: 'transport-tracker', // required
      Updates: [
        // DevicePositionUpdateList // required
        {
          // DevicePositionUpdate
          DeviceId: 'transport1', // required
          SampleTime: new Date(), // required
          Position: [
            // Position // required
            longitude,
            latitude,
          ],
        },
      ],
    };
    const command = new BatchUpdateDevicePositionCommand(input);
    const response = await client.send(command);
    console.log(latitude, longitude);
    console.log('data send successfully!');
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

module.exports = {
  updateTransportLocation,
  getPositions,
  searchPlaceByText,
  searchPlaceByCoordinates,
};

// aws location search-place-index-for-text --index-name casa-andina-index --text "calle ugarte" --filter-countries PER --bias-position ["-71.5374,-16.409"]
// aws location batch-get-device-position --tracker-name "transport-tracker" --device-ids "transport1"
// aws location batch-delete-device-position-history --tracker-name "transport-tracker" --device-id "transport1"
