import {io} from 'socket.io-client';

let socket = io('http://localhost:3000');

let socketService = {
    createServiceSpec: (data) => {
        socket.emit('new-service-spec', data);
    },
    receiveAcceptServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-accept-service-spec', (data) => {
                resolve(data);
            });
        });
    },
    receiveFinalizeServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-finalize-service-spec', (data) => {
                resolve(data);
            });
        });
    },
    acceptFinalizeServiceSpec: (data) => {
        socket.emit('accept-finalize-service-spec', data);
    },
    joinRoom: (roomName) => {
        socket.emit('join-room', roomName);
    }
};

module.exports = socketService;