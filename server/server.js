const http = require('http');
const app = require('./app');

let server = http.createServer(app);

server.listen(8000, () => console.log('Connection is Ready'));