const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let adminSocket = null;  // Переменная для хранения соединения админа
let clientSocket = null; // Переменная для хранения соединения клиента

wss.on('connection', (ws) => {
	console.log('New client connected');

	// Слушаем сообщения от клиента
	ws.on('message', (message) => {
		const parsedMessage = JSON.parse(message);

		// Идентификация подключившегося клиента
		if (parsedMessage.type === 'ADMIN') {
			adminSocket = ws;
			console.log('Admin connected');
		} else if (parsedMessage.type === 'CLIENT') {
			clientSocket = ws;
			console.log('Client connected');
		}
		// Если это обычное сообщение
		else if (parsedMessage.type === 'message') {
			// Если это сообщение от клиента к админу
			if (ws === clientSocket && adminSocket && adminSocket.readyState === WebSocket.OPEN) {
				adminSocket.send(JSON.stringify({
					sender: 'CLIENT',
					text: parsedMessage.text
				}));
			}

			// Если это сообщение от админа к клиенту
			if (ws === adminSocket && clientSocket && clientSocket.readyState === WebSocket.OPEN) {
				clientSocket.send(JSON.stringify({
					sender: 'ADMIN',
					text: parsedMessage.text
				}));
			}
		}
	});

	// Когда клиент отключается
	ws.on('close', () => {
		if (ws === adminSocket) {
			console.log('Admin disconnected');
			adminSocket = null;
		} else if (ws === clientSocket) {
			console.log('Client disconnected');
			clientSocket = null;
		}
	});
});
