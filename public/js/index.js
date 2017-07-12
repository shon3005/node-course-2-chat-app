//stores socket in variable
var socket = io();

// upon connection to localhost, prints connected to user on client
socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'shon3005@gmail.com',
    //     text: 'hey this is shaun'
    // });
    socket.emit('createMessage', {
        from: 'andrew',
        text: 'yup that works for me'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New Email', email);
// })

socket.on('newMessage', function(message) {
    console.log('New Message', message);
});