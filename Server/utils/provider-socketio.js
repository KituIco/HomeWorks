var io = require('socket.io')();
var providerSocketAPI = {};

providerSocketAPI.io = io;

io.on('connection', (socket) => {
    console.log(socket.id) // logs connected users
});


module.exports = providerSocketAPI;