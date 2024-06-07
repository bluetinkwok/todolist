import { Request, Response } from 'express';
import userModel from "../db/models/userModel";
import { User } from '../db/interfaces/userInterface';

class UserController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        try {
            const user: User | undefined = await userModel.login(email, password);

            return res.json(user);
        } catch (err: any) {
            console.error(err);
            return res.status(400).json({ message: err.message });
        }
    }

    async getUserByID(req: Request, res: Response) {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Required data not found' });
        }

        try {
            const user: User | undefined = await userModel.getUserByID(Number(id));

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err: any) {
            console.error(err);
            return res.status(400).json({ message: err.message });
        }
    }
}

export default new UserController();