const logContainer = document.getElementById('log');
const timeElement = document.getElementById('time');
const connectionsElement = document.getElementById('connections');
const statusElement = document.getElementById('status');


let previousConnections = null;


const log = (message) => {
  const logEntry = document.createElement('span');
  logEntry.textContent = message;
  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;
};


const updateStatus = (type) => {
  statusElement.textContent = `Connection Type: ${type}`;
};

const updateServerInfo = (data) => {
  const { time, connections } = data;

 
  timeElement.textContent = `Server Time: ${time}`;
  
  
  connectionsElement.textContent = `Connections: ${connections}`;
  
  
  if (previousConnections !== null && connections !== previousConnections) {
    log(`Connections updated: ${connections} (was ${previousConnections})`);
  }

  
  previousConnections = connections;
};

// Sử dụng SSE
const useSSE = () => {
  log('Connecting via Server-Sent Events (SSE)...');
  updateStatus('SSE');
  const eventSource = new EventSource('/events');

  eventSource.onopen = () => {
    log('Connected via SSE.');
  };

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updateServerInfo(data);
  };

  eventSource.onerror = () => {
    log('SSE connection failed. Falling back to WebSocket...');
    eventSource.close();
    useWebSocket();
  };
};

// Sử dụng WebSocket
const useWebSocket = () => {
  log('Connecting via WebSocket...');
  updateStatus('WebSocket');
  const socket = new WebSocket('ws://localhost:4000');

  socket.onopen = () => {
    log('Connected via WebSocket.');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updateServerInfo(data);
  };

  socket.onclose = () => {
    log('WebSocket connection closed.');
    updateStatus('--');
  };

  socket.onerror = () => {
    log('WebSocket encountered an error.');
  };
};

// Khởi chạy SSE trước, nếu không thành công sẽ chuyển sang WebSocket
useSSE();
