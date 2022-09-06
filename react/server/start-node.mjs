import api, { config } from './api.mjs';
import * as http from 'http';

http.createServer(async (req, res) => {
  api.fetch(req).then((honoRes) => {
    const headers = {};
    for (const header of honoRes.headers) {
      headers[header[0]] = header[1];
    }
    res.writeHead(honoRes.status, honoRes.statusText, headers);
    if (honoRes.body) {
      honoRes.body.on('data', (chunk) => res.write(chunk));
      honoRes.body.on('end', () => res.end());
    } else {
      res.end();
    }
  });
}).listen(config.port);

console.log(`Server listening on port ${config.port}`);
