# bun-research

## Issues
- Postgres and Mongo do not work with bun. Here is the related issue https://github.com/oven-sh/bun/issues/288
- Major frameworks (Fastify, Express) do not work with bun.

# Peformed tests

## Bun with its sqlite database (synchronous API)

![Latency avg 91ms. Throughput avg 1079 req/sec](hono/benchmark/images/bun-sqlite-sync.png)

## Node with sqlite database (synchronous API)

![Latency avg 91ms. Throughput avg 1079 req/sec](hono/benchmark/images/node-sqlite-sync.png)

## Node with sqlite database (asynchronous API)

![Latency avg 91ms. Throughput avg 1079 req/sec](hono/benchmark/images/node-sqlite-async.png)
