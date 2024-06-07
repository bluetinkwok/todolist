import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import user from '../routes/user';

const app = express();
app.use(bodyParser.json());
app.use('/api/users', user);

describe('User Routes', () => {
    it('should login a user', async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send({
            email: 'testing@test.com',
            password: 'testing',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'testing@test.com');
    });

    it('should get a user by ID', async () => {
        const response = await request(app)
        .get('/api/users/user')
        .query({ id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });
});
