import { SQLQueryBindings } from 'bun:sqlite';
import { Todo } from './todo.entity';
import { db } from '../db/datasource';

export class TodoRepository {
    async save(todo: Partial<Todo>): Promise<Todo> {
        const { data, keys, keyBindings } = this.prepareData(todo);
        const query = `INSERT INTO todos(${keys}) VALUES(${keyBindings}) RETURNING *`;
        console.log(query, data);
        return db.query(query).get(data as SQLQueryBindings);
    }

    async update(todo: Partial<Todo>): Promise<Todo> {
        const { data, keys, keyBindings } = this.prepareData({
            ...todo,
            updated: new Date().toISOString()
        });
        const query = `UPDATE todos SET ${keys.map((key, idx) => `${key} = ${keyBindings[idx]}`)} RETURNING *`;
        console.log(query, data);
        return db.query(query).get(data as SQLQueryBindings);
    }

    async find(): Promise<Todo[]> {
        return db.query('SELECT * FROM todos').all();
    }

    findById(id: number): Promise<Todo> {
        return db.query('SELECT * FROM todos WHERE id = $id').get({ $id: id });
    }

    async deleteById(id: number): Promise<Todo> {
        return db.query('SELECT * FROM todos WHERE id = $id RETURNING *').get({ $id: id });
    }

    prepareData(data: Record<string, unknown>): { data: Record<string, unknown>, keys: string[], keyBindings: string[] } {
        return Object.entries(data).reduce((res, [key, val]) => {
            const keyBinding = `$${key}`;
            return {
                ...res,
                data: { ...res.data, [keyBinding]: val },
                keys: [...res.keys, key],
                keyBindings: [...res.keyBindings, keyBinding],
            }
        }, {
            data: {},
            keys: [],
            keyBindings: []
        })
    }
}