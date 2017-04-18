const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => {
    console.info('User was connected');

    client.on('event', data => {
        io.emit('event', data)
    });

    client.on('disconnect', () => {});
});
server.listen(3003);

console.log('server is listening on port 3003');
