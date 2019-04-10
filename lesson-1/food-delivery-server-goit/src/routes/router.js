const mainRoute = require('./main/main');
const productRoute = require('./ProductsRoute/products-route');
const signUpRoute = require('./users/sign-up-route');

const router = {
  '/signup': signUpRoute,
  '/products': productRoute,
  default: mainRoute
};

module.exports = router;
