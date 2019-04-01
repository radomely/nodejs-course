const http = require('http');
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const router = require('./routes/router');

const logger = morgan('combined');

const startServer = port => {

  // создаем сервер
  const server = http.createServer((request, response) => {

    // получаем роут из запроса
    const parsedUrl = url.parse(request.url);

    const getRouteFunc = router[parsedUrl.pathname] || router.defoult;

    // Выводим в консоль информацию о запросах
    logger(request, response, () => {
      getRouteFunc(request, response);
    });
  });


  server.listen(port, err => {
    if(err) {
      return console.log('что-то пошло не так');
    }
    console.log(`server is listening on ${port}`);
  })

};

module.exports = startServer;