import { Hono } from 'hono';
import { todoController } from './controllers/todo.controller';

const app = new Hono();

const port = parseInt(process.env.PORT) || 3000;
const home = app
  .get('/todos', async (c) => {
    try {
      const todos = await todoController.getAll();
      return c.json(todos);
    } catch (err){
      console.error(err);
      throw err;
    }
  })
  .delete('/todos/:id', async (c) => {
    try {
      const id = Number(c.req.param('id'));
      const todo = await todoController.delete(id);

      if (!todo) {
        return c.text('Todo not found', 404);
      }

      return c.json({ status: 'Success' });
    } catch (err){
      console.error(err);
      throw err;
    }
  })
  .get('/todos/:id', async (c) => {
    try {
      const id = Number(c.req.param('id'));
      const todo = await todoController.get(id);

      if (!todo) {
        return c.text('Todo not found', 404);
      }

      return c.json(todo);
    } catch (err){
      console.error(err);
      throw err;
    }
  })
  .post('/todos', async (c) => {
    try {
      const data = await c.req.parseBody();
      const todo = await todoController.create(data);      
      return c.json(todo);
    }
     catch (err) {
      console.error(err)
      throw err;
     }
  })
  .put('/todos/:id', async (c) => {
    try {
      const data = await c.req.parseBody();
      const todo = await todoController.update(data);

      if (!todo) {
        return c.text('Todo not found', 404);
      }

      return c.json(todo);
    } catch (err){
      console.error(err);
      throw err;
    }
  });

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: home.fetch,
};
