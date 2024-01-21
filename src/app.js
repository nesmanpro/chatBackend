const express = require('express');
const app = express();
const PORT = 8080;
const exphbs = require('express-handlebars');
const socket = require('socket.io');
const viewsRouter = require('./routes/views.routes')

// Middlewares

app.use(express.static('./src/public'));

// motor de plantillas handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// routing

app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log('Escuchando en puerto http://localhost:8080')
})


// socket.io

// Creamos instancia de socket.io

const io = new socket.Server(httpServer);

// Vamos a crear un array que guarde los mensajes de los participantes

const message = [];


// Estanlecemos la coneccion:
// io es la instancia de socket.io
//'on' es el metodo para escuchar eventos
// el primer parametro es el evento que queremos escuchar
//el segundo es un callback, q se ejecuta cuando se ejecuta el evento (cuando se ejecuta la conexion)

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado!');

    socket.on('message', data => {
        message.push(data);
        io.emit('messageLogs', message)
        //Con emit, enviamos mensaje desde el servidor al cliente
    })
})
