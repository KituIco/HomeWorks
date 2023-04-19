import {io} from 'socket.io-client';
import {REACT_NATIVE_PACKAGER_HOSTNAME} from '@env';

let socket = io(`http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`);

let socketService = {
    // ============================== request phase ============================== //
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

    // ============================== match phase ============================== //
    rejectChat: (data) => {
        socket.emit('provider-reject-chat', data)
    },
    sendMessage: (data) => {
        socket.emit('send-message', data)
    },
    receiveMessage: () => {
        return new Promise((resolve, reject) => {
            socket.on('receive-message', (data) => {
                resolve(data);
                socket.off('receive-message');
            });
        });
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
        socket.off('receive-message');
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

    // ============================== serve phase ============================== //
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