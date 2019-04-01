const getDefault = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Module 1</h1>");
    response.end();
}

module.exports = getDefault;