var io = require('socket.io')();
var seekerSocketAPI = {};

seekerSocketAPI.io = io;

io.on('connection', (socket) => {
    console.log(socket.id) // logs connected users
});


module.exports = seekerSocketAPI;