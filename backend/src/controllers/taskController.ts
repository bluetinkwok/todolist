import { Request, Response } from 'express';
import taskModel from "../db/models/taskModel";
import { Task, PartialTask, TaskStatus } from '../db/interfaces/taskInterface';

class TaskController {
    async createTask(req: Request, res: Response) {
        const { userId, title } = req.body;

        if (!title || !userId) {
            return res.status(400).json({ error: 'Title and userId are required' });
        }

        try {
            const task: Task = await taskModel.createTask(userId, title);
            res.status(200).json(task);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getTaskById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        try {
            const task: Task | undefined = await taskModel.getTaskById(Number(id));
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getTasksByUserId(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            const tasks: Task[] = await taskModel.getTasksByUserId(Number(userId));
            res.json(tasks);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const updatedTask = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        try {
            const task: PartialTask = await taskModel.updateTask(Number(id), updatedTask);
            res.json(task);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async updateTaskStatus(req: Request, res: Response) {
        const { id, status } = req.body;

        if (!id || (!status && status !== 0)) {
            return res.status(400).json({ error: 'Task ID and status are required' });
        }

        try {
            const task: Task = await taskModel.updateTaskStatus(Number(id), status);
            res.json(task);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getTasks(req: Request, res: Response) {
        const { status, page, limit } = req.query;

        if (!status || !page || !limit) {
            return res.status(400).json({ error: 'Status, Page and Limit are required' });
        }

        const pageNum = page ? parseInt(page as string, 10) : 1;
        const limitNum = limit ? parseInt(limit as string, 10) : 10;

        try {
            const {tasks, total} = await taskModel.getTasks(Number(status) as TaskStatus, pageNum, limitNum);
            res.json({tasks, total, page: pageNum, limit: limitNum});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async deleteTask(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        try {
            await taskModel.deleteTask(Number(id));
            res.status(204).send();
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
}

export default new TaskController();