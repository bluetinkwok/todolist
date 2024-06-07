import { Router } from 'express';
import taskController from '../controllers/taskController';

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', taskController.createTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task description by ID
 *       404:
 *         description: Task not found
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /api/tasks/user/{userId}:
 *   get:
 *     summary: Get tasks by user ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of tasks for the user
 *       404:
 *         description: Tasks not found
 */
router.get('/user/:userId', taskController.getTasksByUserId);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: integer
 *                 description: The task status (0 = Pending, 1 = In Progress, 2 = Completed)
 *     responses:
 *       200:
 *         description: The updated task
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put('/:id', taskController.updateTask);

/**
 * @swagger
 * /api/tasks/status:
 *   post:
 *     summary: Update the status of a task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               status:
 *                 type: integer
 *                 description: The task status (0 = Pending, 1 = In Progress, 2 = Completed)
 *     responses:
 *       200:
 *         description: The updated task
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.post('/status', taskController.updateTaskStatus);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks by status, page, and limit
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0, 1, 2]
 *         required: true
 *         description: The task status (0 = Pending, 1 = In Progress, 2 = Completed)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of tasks
 *       400:
 *         description: Invalid query parameters
 */
router.get('/', taskController.getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', taskController.deleteTask);

export default router;