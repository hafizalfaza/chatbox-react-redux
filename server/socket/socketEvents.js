export default function socketEvents(io){
	
	const connections = [];
	io.on('connection', (socket) => {
	
		connections.push(socket);
		console.log('We have %s connection', connections.length);

		socket.on('new-message', (message) => {
			io.emit("receive-message", message);
			console.log(message);
		});
		
		socket.on('disconnect', () => {
			connections.splice(connections.indexOf(socket), 1);
			console.log('User disconnected, now we have %s connections', connections.length)
		});
	});	
}