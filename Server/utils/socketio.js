var io = require('socket.io')();
var socketAPI = {};

socketAPI.io = io;

io.on('connection', (socket) => {
    // console.log(socket.id) // logs connected users

    socket.on('join-room', (roomName) => {
        socket.join(roomName)
    })

    // ============================== request phase ============================== //
    socket.on('new-service-spec', (data) => {
        socket.to("providers").emit('receive-new-service-spec', data);
    })

    socket.on('service-spec-unavailable', (data) => {
        socket.to("providers").emit('receive-service-spec-unavailable', data);
    })

    socket.on('accept-service-spec', (data) => {
        socket.to(data).emit('receive-accept-service-spec', 'Service Specs Accepted');
    })

    // ============================== match phase ============================== //
    socket.on('send-message', (data) => {
        socket.to(data.roomID).emit('receive-message', data.message);
    })
    
    socket.on('provider-reject-chat', (data) => {
        socket.to(data).emit('receive-provider-reject-chat', 'Provider has Rejected');
    })

    socket.on('seeker-reject-chat', (data) => {
        socket.to(data).emit('receive-seeker-reject-chat', 'Seeker has Rejected');
    })

    socket.on('finalize-service-spec', (data) => {
        socket.to(data).emit('receive-finalize-service-spec', 'Final Specs Sent');
    })

    socket.on('decision-finalize-service-spec', (data) => {
        socket.to(data.roomID).emit('receive-decision-finalize-service-spec', data.decision);
    })

    // ============================== serve phase ============================== //
    socket.on('provider-serving', (data) => {
        socket.to(data).emit('receive-provider-serving', 'Provider is Serving');
    })

    socket.on('payment-received', (data) => {
        socket.to(data).emit('receive-payment-received', 'Provider received Payment');
    })

    socket.on('provider-done', (data) => {
        socket.to(data).emit('receive-provider-done', 'Provider has Finished');
    })
});


module.exports = socketAPI;