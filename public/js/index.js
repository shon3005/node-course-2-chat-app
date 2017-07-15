//stores socket in variable
var socket = io();

// upon connection to localhost, prints connected to user on client
socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'shon3005@gmail.com',
    //     text: 'hey this is shaun'
    // });
    // socket.emit('createMessage', {
    //     from: 'andrew',
    //     text: 'yup that works for me'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New Email', email);
// })

socket.on('newMessage', function(message) {
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('got it', data);
// });

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            logitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
    });
});
