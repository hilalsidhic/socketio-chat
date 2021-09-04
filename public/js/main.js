const chatform= document.getElementById('chatform')
const chatmessages=document.querySelector('.chat-messages')
const roomname=document.getElementById('room-name')
const userlist=document.getElementById('users')

const {username,room}= Qs.parse(location.search,{
    ignoreQueryPrefix: true
})


const socket = io();

socket.emit('joinRoom',{ username, room })

socket.on('roomUsers',({ room,users})=>{
    console.log("socket working")
    outputRoomName(room)
    outputusers(users)
})



socket.on('message', message => {
    outDisplayMessage(message);
    chatmessages.scrollTop=chatmessages.scrollHeight
})

chatform.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg=e.target.elements.msg.value;

    socket.emit('chatmessage',msg)

    e.target.elements.msg.value=null
    e.target.elements.msg.focus();
})

function outDisplayMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.user}<span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`

    chatmessages.appendChild(div);
}

function outputRoomName(room){
    roomname.innerText=room;
}

function outputusers(users){
    userlist.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `
}