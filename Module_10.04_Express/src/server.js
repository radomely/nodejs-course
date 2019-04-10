const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const logger = morgan("combined");

function server(port){
    app.use(bodyParser.json());
    app.use(logger);
    app.get('/', (request, response)=>{
        response.send("<h1>Привет</h1>");
    })

    app.post('/newuser', (request, response)=>{
        const filePath = path.join(__dirname, '/db/users', request.body.username + '.json');
        console.log('body', request.body);
        fs.writeFileSync(filePath, JSON.stringify(request.body));
        response.send('<h1>Запись прошла успешно</h1>');
    })
    
    app.listen(port, function() {
        console.log('servev listening on port ' + port);
    })

}

module.exports = server;