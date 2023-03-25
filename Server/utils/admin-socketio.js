var io = require('socket.io')();
var adminSocketAPI = {};

adminSocketAPI.io = io;

io.on('connection', (socket) => {
    console.log(socket.id) // logs connected users
});


module.exports = adminSocketAPI;