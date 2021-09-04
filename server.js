const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatmessage = require('./public/utils/messages');

const app = express();
const PORT= 3000 || process.env.PORT;
const server =http.createServer(app);
const io = socketio(server)

const bot='chat bot'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=>{

    socket.emit('message',formatmessage(bot,"welcome to chat"));

    socket.broadcast.emit('message',formatmessage(bot,"A user has joined the chat room"))

    socket.on('disconnect', ()=>{
        io.emit('message',formatmessage(bot,'user has disconnected from the chat'))
    })
    socket.on('chatmessage', (msg)=>{
       io.emit('message',formatmessage('USER',msg));
    })
})

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
