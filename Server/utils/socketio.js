var io = require('socket.io')();
var socketAPI = {};

socketAPI.io = io;

io.on('connection', (socket) => {
    console.log(socket.id) // logs connected users

    socket.on('join-room', (roomName) => {
        socket.join(roomName)
    })

    socket.on('new-service-spec', (data) => {
        data.socketId = socket.id;
        socket.to("providers").emit('receive-new-service-spec', data);
    })

    socket.on('accept-service-spec', (data) => {
        socket.to(data.socketId).emit('receive-accept-service-spec', data);
    })

    socket.on('finalize-service-spec', (data) => {
        socket.to(data.socketId).emit('receive-finalize-service-spec', data);
    })

    socket.on('accept-finalize-service-spec', (data) => {
        socket.to(data.socketId).emit('receive-accept-finalize-service-spec', data);
    })
});


module.exports = socketAPI;