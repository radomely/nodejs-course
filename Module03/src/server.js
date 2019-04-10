const express = require('express');
const app = express();
const birdsRouter = require('./routes/birds/birds-routes')

const startServer = port => {
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.use('/birds', birdsRouter);
    
    app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    });
}

module.exports = startServer;