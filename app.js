const io = require("socket.io")(8000);

const users = {};

io.on("connection", function(socket){
    socket.on('new-user-joined', function(name){
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });


    socket.on('send', function(message){
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
})