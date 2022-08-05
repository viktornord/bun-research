import { Hono } from 'hono';
import { Database } from "bun:sqlite";
import { v4 as uuidv4 } from 'uuid';

const db = new Database('sqlite.db');

const app = new Hono();

const port = parseInt(process.env.PORT) || 3000;

const home = app.post("/", (c) => {
  // Just try to insert one user and one order
  try {
    const user = db.query('INSERT INTO users(first_name, last_name, age) VALUES($firstName, $lastName, $age) RETURNING *').get({
      $firstName: 'John',
      $lastName: uuidv4(),
      $age: Math.trunc(Math.random() * 10) + 15
    });
    db.run('INSERT INTO orders(user_id, title, price) VALUES($userId, $title, $price)', {
      $userId: user.id,
      $title: uuidv4(),
      $price: Math.random() * 50
    });
    return c.json({ message: "Hello World!" });
  } catch (err) {
    console.error(err);
  }
});

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: home.fetch,
};
