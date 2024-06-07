import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/user:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.get('/user', userController.getUserByID);

export default router;