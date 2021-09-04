const chatform= document.getElementById('chatform')
const chatmessages=document.querySelector('.chat-messages')

const {username,room}= Qs.parse(location.search,{
    ignoreQueryPrefix: true
})


const socket = io();

socket.emit('joinRoom',{ username, room })

socket.on('message', message => {
    console.log(message);
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