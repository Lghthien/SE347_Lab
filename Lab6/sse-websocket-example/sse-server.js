const express = require('express');
const app = express();
const PORT = 3000;

let connections = 0;

app.use(express.static('public'));


app.get('/events', (req, res) => {
  connections++;

  // Thiết lập header SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = () => {
    const data = JSON.stringify({
      time: new Date().toLocaleTimeString(),
      connections,
    });
    res.write(`data: ${data}\n\n`);
  };

  
  const interval = setInterval(sendEvent, 1000);

 
  req.on('close', () => {
    clearInterval(interval);
    connections--;
  });
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`);
});
