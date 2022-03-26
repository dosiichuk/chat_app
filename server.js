const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
let users = [];

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000);
const io = socket(server);

//when a new socket is created, an event 'connection' is auto-emitted, the server then records a new client
io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);
  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('login', ({ name }) => {
    console.log(`User ${name} has just logged in`);
    users.push({ name, id: socket.id });
    socket.broadcast.emit('join', name);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', {
      name: users.find((user) => user.id === socket.id).name,
    });
    users = users.filter((user) => user.id !== socket.id);
  });
  console.log("I've added a listener on message event \n");
});
