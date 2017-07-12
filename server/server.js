const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// web sockets server
var io = socketIO(server);

// console.log(__dirname + '/../public');
// console.log(publicPath);

app.use(express.static(publicPath));

// event listener, listen for a new connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // creating an event
    // socket.emit('newEmail', {
    //     from: 'sc4224@nyu.edu',
    //     text: 'heyo',
    //     createAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: 'john',
    //     text: 'see you then',
    //     createdAt: 123123
    // })

    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // })

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        // this emits to all
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});
