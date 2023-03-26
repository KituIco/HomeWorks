import {io} from 'socket.io-client';
import {REACT_NATIVE_PACKAGER_HOSTNAME} from '@env';

let socket = io(`http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`);

let socketService = {
    createServiceSpec: (data) => {
        socket.emit('new-service-spec', data);
    },
    receiveAcceptServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-accept-service-spec', (data) => {
                resolve(data);
                socket.off('receive-accept-service-spec');
            });
        });
    },
    receiveFinalizeServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-finalize-service-spec', (data) => {
                resolve(data);
                socket.off('receive-finalize-service-spec');
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