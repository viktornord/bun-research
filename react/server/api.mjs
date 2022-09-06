import { Hono } from 'hono';
import * as path from 'path';
import * as fs from 'fs';
import * as mime from 'mime-types';
import fetch, { Headers, Request, Response } from 'node-fetch';

export const config = {
  port: 3000,
};

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

const api = new Hono();

const getFilePath = (url) => {
  if (url.indexOf('http') === 0) {
    url = new URL(url).pathname;
  }
  return path.resolve(`./build${url.length > 1 ? url : '/index.html'}`);
};

api.get('*', (c) => {
  const filePath = getFilePath(String(c.req.url));
  let data = '';
  try {
    if (!fs.existsSync(filePath)) {
      c.status(404);
    } else {
      c.status(200);
      c.header('Content-Type', mime.contentType(filePath.split('/').pop()));
      data = fs.readFileSync(filePath, 'utf-8');
    }
  } catch (err) {
    c.status(500);
    data = String(err);
    console.log(err);
  }
  return c.body(data);
});

export default api;
