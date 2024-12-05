const WebSocket = require('ws');
const express = require('express');
const app = express();
const PORT = 4000;

let connections = 0;

app.use(express.static('public')); 


const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  connections++;

  const sendEvent = () => {
    const data = JSON.stringify({
      time: new Date().toLocaleTimeString(),
      connections,
    });
    ws.send(data);
  };

  const interval = setInterval(sendEvent, 1000);


  ws.on('close', () => {
    clearInterval(interval);
    connections--;
  });
});

// Kết hợp WebSocket với Express server
const server = app.listen(PORT, () => {
  console.log(`WebSocket server running at http://localhost:${PORT}`);
});

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});
