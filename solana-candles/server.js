import http from 'node:http';
import fs from 'node:fs';
import { WebSocketServer } from 'ws';

export function startServer(port = 8080) {
  const page = fs.readFileSync(new URL('./public/index.html', import.meta.url));

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(page);
  });

  const wss = new WebSocketServer({ server });
  let latest = [];

  // A browser that connects late still gets the current chart immediately.
  wss.on('connection', (socket) => {
    if (latest.length) socket.send(JSON.stringify(latest));
  });

  server.listen(port, () => console.log(`Chart on http://localhost:${port}`));

  return function broadcast(series) {
    latest = series;
    const payload = JSON.stringify(series);
    for (const socket of wss.clients) {
      if (socket.readyState === socket.OPEN) socket.send(payload);
    }
  };
}
