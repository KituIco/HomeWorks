import {io} from 'socket.io-client';
import {REACT_NATIVE_PACKAGER_HOSTNAME} from '@env';

let socket = io(`http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`);

let socketService = {
    receiveNewServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-new-service-spec', (data) => {
                resolve(data);
                socket.off('receive-new-service-spec');
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
                socket.off('receive-accept-finalize-service-spec');
            });
        });
    },

    providerServing: (data) => {
        socket.emit('provider-serving', data);
    },
    paymentReceived: (data) => {
        socket.emit('payment-received', data);
    },
    providerDone: (data) => {
        socket.emit('provider-done', data);
    },

    joinRoom: (roomName) => {
        socket.emit('join-room', roomName);
    },
};

module.exports = socketService;