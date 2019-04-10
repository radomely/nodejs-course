const mainRoute = require('./main/main');
const carsRoute = require('./cars/get-car');

const router = {
  '/cars': carsRoute,
  default: mainRoute
};

module.exports = router;
