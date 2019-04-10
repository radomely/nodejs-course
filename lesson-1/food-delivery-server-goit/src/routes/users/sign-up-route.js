// const qs = require('querystring');
// const fs = require('fs');
// const path = require('path');

// const saveUser = user => {
//   // получить файл с юзером
//   // найти путь папки users
//   // сохранить туда файл
//   const filePath = path.join(__dirname, '../../', 'db/users', `${user.username}.json`);
//   fs.writeFile(filePath, JSON.stringify(user),  function (error) {
//     if (error) throw error;
//     console.log('Saved!');
//   });
// };

// const signUpRoute = (request, response) => {
//   // Взять данные что пришли
//   if (request.method === 'POST') {
//     console.log('POST');
//     let body = '';
//     let filePath = '';
//     request.on('data', function (commingData) {
//       body += commingData;
//       console.log('Incoming data!!!!');
//     });
//     request.on('end', function () {
//       console.log('data_body', JSON.parse(body));
//       const userData = JSON.parse(body);
//       saveUser(userData);
//     });
//     const responseData = {
//       status: "success",
//       user: userData,
//     };
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.write(JSON.stringify(responseData));
//     response.end();
//   }
// };


//   // Взять username с данных, сохранить в переменную

//   // Сохраняем данные в <username>.json

//   // Сохранить <username>.json в папку users

//   // Отправляем файл в ответе с данными юзера
//   // использовать response

// module.exports = signUpRoute;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');

// const querystring = require('querystring');

const signUpRoute = (req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', () => {
      const post = JSON.parse(body);
      saveUser(post);
      console.log(post);
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 'success', user: body }));
    res.end();
  }
};

const saveUser = user => {
  const { username } = user;
  const filePath = path.join(
    __dirname,
    '../../db/users',
    username + '.json'
  );
  fs.writeFile(filePath, JSON.stringify(user), err => {
    if (err) throw err;
    console.log('SAVED!');
  });
};

module.exports = signUpRoute;