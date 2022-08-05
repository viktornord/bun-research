import { promisify } from 'util';
import { Hono } from 'hono';
import { v4 as uuidv4 } from 'uuid';
import * as http from 'http';
import fetch, {
  // Blob,
  // blobFrom,
  // blobFromSync,
  // File,
  // fileFrom,
  // fileFromSync,
  // FormData,
  Headers,
  Request,
  Response,
} from 'node-fetch';

import sqlite from 'sqlite3';
const { Database } = sqlite.verbose();

const db = new Database('sqlite.db');

// Polyfill Request/Response classes for Node.js
// Bun has all these defined internally
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

const app = new Hono();
const port = 3000;

const dbRun = (...args) => new Promise((res, rej) => {
  return db.run(...args, function (err) {
    err ? rej(err) : res({ lastInsertRowid: this.lastID });
  });
});

app.post('/', async (c) => {
  try {
    const { lastInsertRowid: userId } = await dbRun('INSERT INTO users(first_name, last_name, age) VALUES($firstName, $lastName, $age) RETURNING *', {
      $firstName: 'John',
      $lastName: uuidv4(),
      $age: Math.trunc(Math.random() * 10) + 15
    });
    await dbRun('INSERT INTO orders(user_id, title, price) VALUES($userId, $title, $price)', {
      $userId: userId,
      $title: uuidv4(),
      $price: Math.random() * 50
    });
    
    return c.json({ message: "Hello World!" });
  } catch (err) {
    console.error(err);
  }
});

// Server definition used by Node.js
const server = http.createServer((req, res) => {
  app.fetch(req).then(async (honoRes) => {
    honoRes.body.pipe(res);
  });
});

server.listen(port);
console.log(`Hono app listening on port ${port}`);
