const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
console.log(messageInput);
const messageContainer = document.querySelector(".container");

form.addEventListener('submit', function(e){
    e.preventDefault();
    const mess = messageInput.value;
    append(`You : ${mess}`, 'left');
    socket.emit('send', mess);
    messageInput.value = '';
});


const append = (message, position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);


socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
})


socket.on('receive', data=>{
    append(`${data.name} : ${data.message}`, 'right');
})

socket.on('leave', data=>{
    append(`${data.name} left you. He'll go to hell.`, 'right');
})
