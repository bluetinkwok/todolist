import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import task from '../routes/task';
import { TaskStatus } from '../db/interfaces/taskInterface';

const app = express();
app.use(bodyParser.json());
app.use('/api/tasks', task);

let task_id: number;

describe('Task Routes', () => {

    it('should create a new task', async () => {
        const response = await request(app)
        .post('/api/tasks')
        .send({
            userId: 1,
            title: 'Test Task'
        });

        task_id = Number(response.body.id);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Test Task');
    });

    it('should get a task by ID', async () => {
        const response = await request(app)
        .get('/api/tasks/' + task_id);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', task_id);
    });

    it('should get tasks by user ID', async () => {
        const response = await request(app)
        .get('/api/tasks/user/1');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update the status of a task', async () => {
        console.log('Task ID:', task_id);
        const response = await request(app)
        .post('/api/tasks/status')
        .send({ id: task_id, status: TaskStatus.Completed });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', String(TaskStatus.Completed));
    });

    it('should get tasks by status', async () => {
        const response = await request(app)
        .get('/api/tasks')
        .query({ status: TaskStatus.Pending, page: 1, limit: 10});

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});