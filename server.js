const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static('public')); // Carpeta donde colocas tu index.html

io.on('connection', (socket) => {
    console.log('Unidad conectada a la PDA de Valencia');

    // Escuchar cambios de estado
    socket.on('update-status', (data) => {
        io.emit('status-changed', data); // Retransmitir a todas las unidades
    });

    // Escuchar nuevos avisos
    socket.on('new-incident', (data) => {
        io.emit('incident-added', data); // Transmitir la emergencia en tiempo real
    });
});

server.listen(3000, () => {
    console.log('PDA Valencia corriendo en http://localhost:3000');
});
