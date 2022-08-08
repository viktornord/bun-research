import api, { config } from './api.mjs';

console.log(`Server listening on port ${config.port}`);

export default {
  port: config.port,
  fetch: api.fetch,
};
