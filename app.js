const io = require("socket.io")(8000, {cors: {origin: '*',}});
const users = {};

io.on("connection", function(socket){
    socket.on('new-user-joined', name=>{
        console.log(name + " joined the chat.");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });


    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
})