const express = require('express');
const cors = require('cors');
const { LocationClient, AssociateTrackerConsumerCommand } = require('@aws-sdk/client-location');

const app = express();

app.set('port', 5000);
app.use(cors('dev'));

app.use(require('./routes/awsLocation'));
app.use(require('./location'));

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}`));
