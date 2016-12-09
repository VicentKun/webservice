// Module dependencies.

var   app = require('../app'); // This get the module exported form app.js

var  http = require('http');

// Get port from environment and store in Express.

var port = normalizePort(process.env.PORT || '3000');

app.set('port', port);


// Create HTTP server.

var server = http.createServer(app);


// Listen on provided port, on all network interfaces.

server.listen(port);

server.on('error', onError); //If server have a error, call function onError().

server.on('listening', onListening); //While server is listening, execute onListening() funcion.


// Normalize a port into a number, string, or false.

function normalizePort(val) {
	
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		
		return val; //Named pipe
		
	}

	if (port >= 0) {
	
		return port; //Port number
		
	}

	return false;
	
}

// Event listener for HTTP server "error" event.

function onError (error) {
	
	if (error.syscall !== 'listen') {
		
		throw error;
		
	}
	
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	
	// handle specific listen errors with friendly messages
  	switch (error.code) {
    		
		case 'EACCES':
      			console.error(bind + ' requires elevated privileges');
      			process.exit(1);
      			break;
			
    		case 'EADDRINUSE':
      			console.error(bind + ' is already in use');
      			process.exit(1);
      			break;
			
    		default:
      			throw error;
  	}
	
};


// Event listener for HTTP server "listening" event.

function onListening () {

	var addr = server.address();
	
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	

	console.log('\r\n------------------------------------------------------------------------\r\n');
	console.log('Application listening on ' + bind + ' in ' + app.get('env') + ' mode ...\r\n');
	console.log('Address: http://localhost:' + addr.port + '\r\n');
	console.log('------------------------------------------------------------------------\r\n');

}