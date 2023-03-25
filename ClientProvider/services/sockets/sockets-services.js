import {io} from 'socket.io-client';

let socket = io('http://localhost:3000');

let socketService = {
    receiveNewServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-new-service-spec', (data) => {
                resolve(data);
            });
        });
    },
    acceptServiceSpec: (data) => {
        socket.emit('accept-service-spec', data);
    },
    finalizeServiceSpec: (data) => {
        socket.emit('finalize-service-spec', data);
    },
    receiveAcceptFinalizeServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-accept-finalize-service-spec', (data) => {
                resolve(data);
            });
        });
    },
    joinRoom: (roomName) => {
        socket.emit('join-room', roomName);
    }
};

module.exports = socketService;