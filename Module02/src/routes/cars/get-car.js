const url = require("url");
const path = require("path");
const fs = require("fs");


const getId = path => {
  const lastIndex = path.lastIndexOf('/');
  if(lastIndex !== -1) {
    const id = path.slice(lastIndex + 1);
    return id !== 'cars' ? id : null
  }
}

const filterById = (id, arr) => {
  return arr.filter(el => el.id === id)
}

const filterMulty = (query, arr) => {
  const queryArr = query.split(',');
  console.log("queryArr:", queryArr);
  return arr.filter(car => queryArr.includes(car.id));
}

const getCars = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  // console.log('parsedUrl', parsedUrl);
  
  const id = getId(parsedUrl.path);
  const filePath = path.join(__dirname, "../../", "db", "cars.json");
  const fileData = JSON.parse(fs.readFileSync(filePath));
  // let filteredCars;
  response.writeHead(200, { "Content-Type": "application/json" });
  if (!id) {
    response.write(JSON.stringify({ status: "success", cars: fileData.cars }));
  } else if (parsedUrl.search) {
    const queryParam = parsedUrl.query.id.trim().replace(/"/g, '').replace(/'/g, '')
    const multy = filterMulty(queryParam, fileData.cars);

    response.write(JSON.stringify({ status: "success", cars: multy }));
  } else {
    const filteredCars = filterById(id, fileData.cars);
    response.write(JSON.stringify({ status: "success", cars: filteredCars }));
  };
  response.end();

  // console.log("filteredCars", filteredCars);
};

module.exports = getCars;
