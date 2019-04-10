const http = require('http');
const url = require('url');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes/router');

const logger = morgan('combined');

const startServer = port => {

  const server = http.createServer((request, response) => {

    // Get route from the request
    const parsedUrl = url.parse(request.url);
    // Get router function
    const func = router[parsedUrl.pathname] || router.default;

    logger(request, response, () => func(request, response));
  });
  
  server.listen(port, err => {
    if(err) {
      console.log('oh nooo! errorrrrr!');
    }
    console.log(`server is listening on ${port}`);
  })
};
module.exports = startServer;