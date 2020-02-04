import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.174:3333', {
    autoConnect: false
});

function subscribeToNewDevs(subscribeFunciton) {
    socket.on('new-dev', subscribeFunciton);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    };

    socket.connect();
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};