const Chat = require('./models/chat');

module.exports = (io) => {

    const users = {};

    io.on('connection', async (socket) => {
        console.log('New user connected');

        const messages = await Chat.find();
        socket.emit('load-old-msgs', messages);

        socket.on('new-user', (data, cb) => {
            // console.log(data);
            if (data in users) {
                cb(false)
            } else {
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNicknames();
            }
        });

        socket.on('send-message', async (data, cb) => {
            // console.log(data);
            let msg = data.trim();

            if (msg.substring(0, 3) === '/w ') { // Mensaje privado
                msg = msg.substring(3);
                const index = msg.indexOf(' ');
                if (index !== -1) {
                    const name = msg.substring(0, index);
                    const message = msg.substring(index + 1);
                    if (name in users) {
                        users[name].emit('whisper', { // users[name] es el socket solo de esa conexion al servidor
                            msg: message,
                            nick: socket.nickname
                        });
                    } else {
                        cb('Error! Please, enter a Valid User.');
                    }
                } else {
                    cb('Error! Please, enter your message.')
                }
            } else { // Mensaje grupal normal
                const newMsg = new Chat({
                    msg,
                    nick: socket.nickname
                });
                await newMsg.save(); // mesaje (con el user, o nick) guardado en DB

                io.sockets.emit('new-message', {
                    msg: data,
                    nick: socket.nickname
                });
            }            
        });

        socket.on('disconnect', (data) => {
            if (!socket.nickname) return;
            // users.splice(users.indexOf(socket.nickname), 1);
            delete users[socket.nickname];
            updateNicknames();
        });

        function updateNicknames() {
            io.sockets.emit('usernames', Object.keys(users)); // VER NOTA-1 ABAJO
        }
    });
};

/* 
    NOTA-1: COMO EN LA INTERFAZ (EN EL PANEL DONDE SE RECIBE LA LISTA DE USUARIOS) SE ESPERA UN ARRAY Y USERS ES UN OBJETO, CONTRUIMOS UN ARRAY CON LA CLAVES DEL OBJETO USERS. VER METODO "Object.keys" EN:
    https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
*/