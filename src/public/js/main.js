const socket = io({ path: "/chat/socket.io" });

// Obtaining DOM elements from the Chat, Nick form and Usernames container interfaces
const d = document,
    $messageForm = d.getElementById('message-form'),
    $messageBox = d.getElementById('message'),
    $chat = d.getElementById('chat'),
    $nickWrap = d.getElementById('nick-wrap'),
    $contentWrap = d.getElementById('content-wrap'),
    $nickForm = d.getElementById('nick-form'),
    $nickName = d.getElementById('nick-name'),
    $nickError = d.getElementById('nick-error'),
    $users = d.getElementById('usernames');

// Utilities
const displayMessages = (data, old) => old
    ? $chat.innerHTML += `<p class="old"><strong>${data.nick}</strong>: ${data.msg}</p>`
    : $chat.innerHTML += `<p><strong>${data.nick}</strong>: ${data.msg}</p>`;

const playSound = () => {
    const audio = new Audio();
    audio.src = 'audio/sound.mp3';
    audio.play();
};

// Events
$nickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('new-user', $nickName.value, (data) => {
        if (data) {
            $nickWrap.style.display = 'none'; // VER NOTA-1 ABAJO
            $contentWrap.style.display = 'block';
        } else {
            $nickError.innerHTML = `<div class="alert alert-danger">
                                        That Username is already exits.
                                    </div>`;
        }
    });
    $nickName.value = '';
    $nickName.focus();
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();    
    socket.emit('send-message', $messageBox.value, (data) => {
        $chat.innerHTML += `<p class="error">${data}</p>`;
    });
     // Con la ultima funcion (callback), esperamos a los posibles errores
    $messageBox.value = '';
    $messageBox.focus();
});

socket.on('load-old-msgs', (data) => data.map((el) => displayMessages(el, 'old')));

socket.on('new-message', (data) => {
    displayMessages(data);
    playSound();
});

socket.on('whisper', (data) => {
    $chat.innerHTML += `<p class="whisper"><strong>${data.nick}</strong>: ${data.msg}</p>`;
    playSound();
});

socket.on('usernames', (data) => {
    const html = data.map((el) =>  `<p>
                                        <span class="material-icons mr-2 align-middle">account_circle</span>
                                        ${el}
                                    </p>`).join('\n');

    $users.innerHTML = html;
});

/* 
    NOTA-1. VER:
    https://www.digitalocean.com/community/tutorials/como-modificar-atributos-clases-y-estilos-en-el-dom-es
*/