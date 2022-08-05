import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

// TODO add validation layer
class TodoController {
    todoRepo = new TodoRepository();

    create(todo: Partial<Todo>): Promise<Todo> {

        return this.todoRepo.save(todo)
    }

    update(todo: Partial<Todo>): Promise<Todo> {

        return this.todoRepo.update(todo)
    }

    getAll(): Promise<Todo[]> {
        return this.todoRepo.find();
    }

    get(id: number): Promise<Todo> {
        return this.todoRepo.findById(id);
    }

    delete(id: number): Promise<Todo> {
        return this.todoRepo.deleteById(id)
    }
}

export const todoController = new TodoController();