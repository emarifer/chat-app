const app = require('./app');
const http = require('http');
const socketio = require('socket.io');

// Initializations
require('./database');
const server = http.createServer(app);
const io = socketio(server, {
    path: '/chat/socket.io'
});
require('./sockets')(io);

// Start server
server.listen(app.get('port'), () => {
    console.log(`App listening at http://localhost:${app.get('port')}`);
});

/* 
    IMPORTANTE. SERVIR EL ARCHIVO ESTATICO DE SOCKET.IO EN LA SUBRUTA DEL SERVIDOR. VER:
    https://stackoverflow.com/questions/58602908/how-do-i-use-socket-io-from-a-server-at-a-subfolder
*/
