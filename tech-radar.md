---
title:      "Bun js"
ring:       hold
quadrant:   platforms-and-services
featured:   true
---

<img style="display: block; margin-left: auto; margin-right: auto; width:200px;" src="https://bun.sh/logo.svg" alt="drawing"/>

<br/>
<br/>

[Bun](https://bun.sh) is a new JavaScript runtime with a native bundler, transpiler, task runner and npm client built-in. Bundle, transpile, install and run JavaScript & TypeScript projects — all in Bun.

### About Bun
Bun is a platform for running JavaScript outside of a web browser, same as Node.js or Deno, but improves upon the two. 

It is currently in beta stage, under heavy development, not yet production-ready and lacking a well-written documentation. 

### Why is Bun promising?

#### Compatibility

Unlike Deno, Bun promises compatibility with Node.js, by replicating most of Node’s internal modules and supporting npm packages through its package manager. However, this is still in progress.

#### Performance 

Bun runs faster than Node.js or Deno because it is written in Zig on top of Safari’s JavaScriptCore, while Node.js is written in C++ and Deno in Rust, both on top of Chrome’s V8. 

The performance improvement is visible when running applications, but also when installing npm packages using Bun’s package manager. 

#### Built-in functionality 

Bun acts as an all-in-one tool (transpiler/bundler/task runner) removing the need for third-party tools like Babel, Webpack or Grunt. 

It offers out-of-the-box transpilation of TypeScript and JSX, and plans to support many more extensions (e.g. Vue, SCSS) and processes (e.g. minification) down the road. 

Has integrated support for sqlite3 and maybe more database drivers in the future. 

### Current state / issues 

- [Short-term roadmap](https://github.com/oven-sh/bun/issues/159)
- [Priorities](https://github.com/oven-sh/bun/issues/798)
- [Active issues](https://github.com/oven-sh/bun/issues)

Bun works only on high-performance Unix variants - macOS (x86 and Arm), Linux or Microsoft Windows Subsystem for Linux (WSL). More systems will be supported in the future. 

Occasional crashes happen, needs more stability. 

### JSX / TSX support

Bun claims support for JSX syntax transpilation using the built-in SolidJS JSX transformer. However, the transformer is not completely implemented and [not working as expected](https://github.com/oven-sh/bun/issues/496). This can be fixed by installing Bun to another transformer like [react-jsx](https://www.npmjs.com/package/react-jsx). 

Bun can run JSX/TSX files on-the-spot, offering a big advantage over Node.js, as it doesn’t need third-party tools like Webpack or Babel. 

### Frameworks support
| Framemork | Support | Comment |
|---|---|---|
| [Hono](https://www.npmjs.com/package/hono)   | :white_check_mark: | Seems to be very basic framework with small amount weekly downloads |
| [Express](https://www.npmjs.com/package/express) | :x: | See [github issue](https://github.com/oven-sh/bun/issues/496) |
| [Fastify](https://www.npmjs.com/package/fastify)  | :x: |   |
| [Nest](https://www.npmjs.com/package/@nestjs/core)  | :x: | Nest utilizes express / fastify under the hood which leads to the same errors we have for the underlying framework |

### Database support
| Framemork | Support | Comment |
|---|---|---|
| [Bun sqlite](https://github.com/oven-sh/bun#bunsqlite-sqlite3-module)  | :white_check_mark: | Nest utilizes express / fastify under the hood which leads to the same errors we have for the underlying framework |
| [Mongo](https://www.npmjs.com/package/mongodb)   | :x: | See [github issue](https://github.com/oven-sh/bun/issues/288) |
| [Postgres](https://www.npmjs.com/package/pg) | :x: | See [github issue](https://github.com/oven-sh/bun/issues/288) |
| [Sqlite](https://www.npmjs.com/package/sqlite3)  | :x: | Synchronous version of sqlite provided by bun. However there is an [github issue](https://github.com/oven-sh/bun/issues/978) raised already |

[Result of benchmarking](https://gitlab.lohika.com/rnd-hub/bun-research) - Bun is apparently faster when we run the same app on node with synchronous sqlite but if we run node with async sqlite then it beats bun. Probably if bun implements async sqlite it will be better and might be useful. 

### Summary
As of now bun does not work with any major framework except hono. Also, no database client is supported except sqlite which is synchronous. So it seems like currently bun is not supposed to be used for production apps. 

Bun is being updated quite often, even though it does not support a lot of stuff right now, things could change in the near future. It is very promising but is quite raw to be used for prod apps at the moment.  

Pros: 
- Speed execution (due to the internal engine implementation) 
- Support of tsx without webpack / babel
- Fast dependencies installation (using bun add / bun install) 

Cons: 
- No support for express, fastify, nest (09.08.22)
- No support for pg client, mongodb
- Sqlite has only sync api 
