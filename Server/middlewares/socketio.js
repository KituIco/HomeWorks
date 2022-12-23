const socket_io = require('socket.io');
var io = socket_io();
var socketAPI = {};

socketAPI.io = io;

io.on('connection', (socket) => {
    console.log(socket.id) // logs connected users
});


module.exports = socketAPI;