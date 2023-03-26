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
    receiveServiceSpecUnavailable: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-service-spec-unavailable', (data) => {
                resolve(data);
                socket.off('receive-service-spec-unavailable');
            });
        });
    },
    offReceiveSpecs: () => {
        socket.off('receive-new-service-spec');
        socket.off('receive-service-spec-unavailable');
    },
    acceptServiceSpec: (data) => {
        socket.emit('accept-service-spec', "specs-" + data);
        socket.emit('service-spec-unavailable', data);
    },

    rejectChat: (data) => {
        socket.emit('provider-reject-chat', data)
    },
    receiveRejectChat: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-seeker-reject-chat', (data) => {
                resolve(data);
                socket.off('receive-seeker-reject-chat');
            });
        });
    },
    offChat: () => {
        socket.off('receive-seeker-reject-chat');
    },
    
    finalizeServiceSpec: (data) => {
        socket.emit('finalize-service-spec', data);
    },
    receiveDecisionFinalizeServiceSpec: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-decision-finalize-service-spec', (data) => {
                resolve(data);
                socket.off('receive-decision-finalize-service-spec');
            });
        });
    },
    offDecision: () => {
        socket.off('receive-decision-finalize-service-spec');
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