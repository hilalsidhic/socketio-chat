const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatmessage = require('./public/utils/messages');
const { userJoin,getCurrentUser,userleave,getroomusers } = require('./public/utils/userroom');

const app = express();
const PORT= 3000 || process.env.PORT;
const server =http.createServer(app);
const io = socketio(server)

const bot='chat bot'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=>{

    socket.on('joinRoom',({ username,room})=>{
     const user = userJoin(socket.id,username,room)
     socket.join(user.room)

     socket.emit('message',formatmessage(bot,`welcome to chat ${username}`));

     socket.broadcast.to(user.room).emit('message',formatmessage(bot,`A ${username} has joined the chat room`))

    })

    socket.on('disconnect', ()=>{
       const user= userleave(socket.id)
        if(user){
            console.log(user[0]);
            io.to(user[0].room).emit('message',formatmessage(bot,`${user[0].username} has disconnected from the chat`));
        }
    })

    socket.on('chatmessage', (msg)=>{
        const user =getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatmessage(user.username,msg))
    })

})

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
