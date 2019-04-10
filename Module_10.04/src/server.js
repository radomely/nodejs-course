const http = require('http');
const url = require('url');
const morgan = require('morgan');
const router = require('./routes/router');
const logger = morgan('combined');

const startServer = port => {
  const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);
    const func = router[parsedUrl.pathname] || router.default;
    logger(request, response, () => func(request, response));
  });
  server.listen(port, ()=>{console.log('Server start on port ' + port)});
};

module.exports = startServer;