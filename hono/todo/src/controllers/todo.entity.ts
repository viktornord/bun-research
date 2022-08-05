export class Todo {
    id: number;
    title: string;
    author: string;
    created: Date;
    updated: Date;

    constructor(data: Partial<Todo>) {
        Object.assign(this, data);
    }
}