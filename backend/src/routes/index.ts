import express from 'express';
import user from './user';
import task from './task';

const router = express.Router();

export default (): express.Router => {
    router.use('/api/users', user);
    router.use('/api/tasks', task);

    return router;
}