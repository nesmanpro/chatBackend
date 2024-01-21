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