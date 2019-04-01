// const misc = require('./simpleModule');
// console.log("Добавив %d к 10 мы получим %d", misc.x, misc.addX(10));
////////////////////////////////////////////////
// const user =require('./simpleModule')
// const u = new user('Alex', 'email@mail.com');
// console.log(u);
/////////////////////////////////////////////////
// require('./simpleModule')(9050);
/////////////////////////////////////////////////
//Проверка расширения файла
const path = require('path');
console.log(path.extname('index.html'));

console.log(path.join('/foo', 'bar', 'baz/asdf','..', 'quux', '../../'))

console.log(path.parse('/home/user/dir/file.txt'));

console.log(path.resolve('/foo/bar', './baz'));

console.log(path.resolve('/foo/bar', '/tmp/file/'));

console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));
//Если текущая рабочая директория /home/myself/node,
//Возвращает '/home/myself/node/wwwroot/static_files//gif/image.gif'