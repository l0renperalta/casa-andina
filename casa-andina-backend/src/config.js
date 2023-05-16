const { config } = require('dotenv');

config();

const AWS_REGION = process.env.AWS_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

module.exports = {
  AWS_REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
};
