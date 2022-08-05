import { Database } from "bun:sqlite";

import { Todo } from '../controllers/todo.entity';

export const db = new Database('todo/sqlite.db');