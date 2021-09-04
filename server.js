const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const PORT= 3000 || process.env.PORT;
const server =http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=>{

    socket.emit('message',"welcome to chat");

    socket.broadcast.emit('message',"A user has joined the chat room")

    socket.on('disconnect', ()=>{
        io.emit('message','user has disconnected from the chat')
    })
    socket.on('chatmessage', (msg)=>{
       io.emit('message',msg);
    })
})

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
