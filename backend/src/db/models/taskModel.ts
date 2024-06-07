import knex from '../../config/db';
import { Task, PartialTask, TaskStatus } from '../interfaces/taskInterface';

class TaskModel {
    async createTask(userId: number, title: string): Promise<Task> {
        const query = `
            INSERT INTO tasks (user_id, title, status)
            VALUES (?, ?, ?)
            RETURNING id, user_id, title, status, created_at, updated_at
        `;
        const result = await knex.raw(query, [userId, title, TaskStatus.Pending]);
        const task: Task = result.rows[0];
        return task;
    }

    async getTaskById(taskId: number): Promise<Task | undefined> {
        const query = `
            SELECT * FROM tasks
            WHERE id = ?
        `;
        const result = await knex.raw(query, [taskId]);
        const task: Task | undefined = result.rows[0];
        return task;
    }

    async getTasksByUserId(userId: number): Promise<Task[]> {
        const query = `
        SELECT * FROM tasks
        WHERE user_id = ?
        `;
        const result = await knex.raw(query, [userId]);
        const tasks: Task[] = result.rows;
        return tasks;
    }

    async updateTask(taskId: number, updatedTask: Partial<Task>): Promise<PartialTask> {
        const query = `
            UPDATE tasks
                SET title = COALESCE(?, title),
                    status = COALESCE(?, status),
                    updated_at = NOW()
            WHERE id = ?
            RETURNING id, title, status, created_at, updated_at
        `;
        const result = await knex.raw(query, [
            updatedTask.title,
            updatedTask.status,
            taskId,
        ]);
        const task: PartialTask = result.rows[0];
        return task;
    }

    async updateTaskStatus(taskId: number, status: TaskStatus): Promise<Task> {
        const query = `
            UPDATE tasks
            SET status = ?, updated_at = NOW()
            WHERE id = ?
            RETURNING id, title, user_id, status, created_at, updated_at
        `;
        const result = await knex.raw(query, [status, taskId]);
        const task: Task = result.rows[0];
        return task;
    }

    async getTasks(status: TaskStatus, page: number = 1, limit: number = 10): Promise<{ tasks: Task[], total: number }> {
        const offset = (page - 1) * limit;

        const query = `
            SELECT * FROM tasks
            WHERE status = ?
            LIMIT ? OFFSET ?
        `;

        const totalQuery = `
            SELECT COUNT(*) as count FROM tasks
            WHERE status = ?
        `;

        const tasks = await knex.raw(query, [status, limit, offset]);
        const totalResult = await knex.raw(totalQuery, [status]);
        const total = totalResult.rows[0].count;

        return { tasks: tasks.rows, total: Number(total) };
    }

    async deleteTask(taskId: number): Promise<void> {
        const query = `
            DELETE FROM tasks
            WHERE id = ?
        `;
        await knex.raw(query, [taskId]);
    }
}

export default new TaskModel();