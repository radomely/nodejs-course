const path = require('path');
const fs = require('fs');

const productRoute = (req, res) => {
  console.log('Inter', req);
  if (req.method === 'GET') {
    const filePath = path.join(__dirname, '../../db/products', 'all-products.json');
    const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify({status: 'success', products: file}));
    res.end();
  }
}

module.exports = productRoute;