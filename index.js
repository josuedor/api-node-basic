const config = require("./server/config/config");
const server = require("./server/server");

server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
