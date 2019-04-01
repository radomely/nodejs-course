const http = require('http');
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const logger = morgan('combined');

const startServer = port => {

  // создаем сервер
  const server = http.createServer((request, response) => {

    // получаем роут из запроса
    const parsedUrl = url.parse(request.url);

    // Выводим в консоль информацию о запросах
    logger(request, response, () => {
      console.log(request.url);
      if(parsedUrl.pathname === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<h1>Module 1</h1>");
        response.end();
      }
      if(parsedUrl.pathname === '/cars') {
        if (request.method === 'GET') {
          const filePath = path.join(__dirname, 'db', 'cars.json');

          response.writeHead(200, {
            'Content-Type': 'application/json',
          });

          const file = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          console.log(file.cars);
          response.write(JSON.stringify({ status: 'success', cars: file.cars }));
          response.end();
        }
      }
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