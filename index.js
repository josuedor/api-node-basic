"use strict"

const config = require('./config/config')
const server = require('./server/server')

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
