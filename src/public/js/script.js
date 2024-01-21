// Instancia de socket.io del lado del cliente
const socket = io();

// variable para guardar el usuario

let user;

const chatBox = document.getElementById('chatBox');


//sweet alert 2 
//Swal es un objeto global que nos permite usar los metodos de la libreria.
//Fire , es un metodo que nos permite configurar el alert.


Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa un usuario para identificarte',
    inputValidator: (value) => {
        return !value && 'necesitas escribir un nombre para continuar'
    },
    allowOutsideClick: false,
}).then(res => {
    user = res.value;
    console.log(user)
})

chatBox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            // Trim nos permite sacar espacios en blanco del principio y final
            // Si el mensaje tiene mas de 0 caracteres lo enviamos al servidor
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = '';

        }
    }
})

// Listener de mensajes
socket.on('messageLogs', (data) => {
    let log = document.getElementById('messageLogs');
    let messages = '';

    data.forEach(message => {
        messages = messages + `<strong>${message.user} dice:</strong> ${message.message}<br>`
    });

    log.innerHTML = messages;
})
