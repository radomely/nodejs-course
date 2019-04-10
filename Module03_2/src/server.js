const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

app.use(cors());

const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


const app = express();

const dbUsersPath = path.join(__dirname, '/db/users');

const startServer = port => {
    app.use(bodyParser.json());
    
    app.get('/', (req, res) => {
        debugger;
        res.send('Root Page');
    })

    // app.post('/user', (req, res) => {
    //     const dbUsersPath = path.join(__dirname, '/db/users');
    //     const body = req.body;
    //     if(req.body && req.body.userName) {
    //         console.log('save file to drive');
    //         fs.writeFileSync(`${dbUsersPath}/${body.userName}.json`, JSON.stringify(body));
    //     }
    //     console.log(body);
    //     res.send({ status: "success" });
    // })
    app.post('/user', (req, res) => {
        const dbUsersPath = path.join(__dirname, '/db/users');
        const userData = JSON.parse(fs.readFileSync(`${dbUsersPath}/all-users.json`, 'utf8'));
        const body = req.body;
        if(req.body && req.body.userName) {
            const newArr = [...userData.users, body];
            // newArr.push(body);
            console.log('save file to drive');
            fs.writeFileSync(`${dbUsersPath}/all-users.json`, JSON.stringify({users: newArr}));
        }
        console.log(body);
        res.send({ status: "success" });
    })
    /////////////////////////
    app.put('/user/:id', (req, res) => {
        console.log('PUT')
        const usersData = JSON.parse(fs.readFileSync(`${dbUsersPath}/all-users.json`, 'utf8'));
        const body = req.body;
        if(req.body && req.body.userName) {
            const newArr = [...usersData.users].map(el => {
                if (el.uid === req.params.id) {
                    return ({
                       ...el,
                       ...body,
                    })                
                 }
                 return el;
             });
            console.log('save file to drive');
            fs.writeFileSync(`${dbUsersPath}/all-users.json`, JSON.stringify({ users: newArr }));
        }
         console.log(body);
         res.send({ status: "success" });
    })


    app.delete('/user/:id', (req, res) => {
        console.log('DELETE')
        const usersData = JSON.parse(fs.readFileSync(`${dbUsersPath}/all-users.json`, 'utf8'));
        const body = req.body;
        if(req.params.id) {
            const newArr = [...usersData.users].filter(el => (el.uid !== req.params.id));
            console.log('save file to drive');
            fs.writeFileSync(`${dbUsersPath}/all-users.json`, JSON.stringify({ users: newArr }));
        }
         console.log(body);
         res.send({ status: "success" });
    })



    app.listen(port, () => {
        console.log(`Server is listening on ${port}!`);
    });
}

module.exports = startServer;