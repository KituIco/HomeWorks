import {io} from 'socket.io-client';
import {REACT_NATIVE_PACKAGER_HOSTNAME} from '@env';

let socket = io(`http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`);

let socketService = {
    createServiceSpec: (data) => {
        socket.emit('new-service-spec', data);
    },
    serviceSpecUnavailable: (data) => {
        socket.emit('service-spec-unavailable', data);
    },

    receiveAcceptServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-accept-service-spec', (data) => {
                resolve(data);
                socket.off('receive-accept-service-spec');
            });
        });
    },
    offReceiveAcceptServiceSpec: () => {
        socket.off('receive-accept-service-spec');
    },

    rejectChat: (data) => {
        socket.emit('seeker-reject-chat', data)
    },
    receiveRejectChat: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-provider-reject-chat', (data) => {
                resolve(data);
                socket.off('receive-reject-chat');
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
    offChat: () => {
        socket.off('receive-provider-reject-chat');
        socket.off('receive-finalize-service-spec');
    },

    decisionFinalizeServiceSpec: (data) => {
        socket.emit('decision-finalize-service-spec', data);
    },

    receiveProviderServing: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-provider-serving', (data) => {
                resolve(data);
                socket.off('receive-provider-serving');
            });
        });
    },
    receivePaymentReceived: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-payment-received', (data) => {
                resolve(data);
                socket.off('receive-payment-received');
            });
        });
    },
    receiveProviderDone: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-provider-done', (data) => {
                resolve(data);
                socket.off('receive-provider-done');
            });
        });
    },

    joinRoom: (roomName) => {
        socket.emit('join-room', roomName);
    }
};

module.exports = socketService;