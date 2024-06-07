import knex from '../../config/db';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/userInterface';

class UserModel {
    async getUserByID(userId: number): Promise<User | undefined> {
        const query = `SELECT * FROM users WHERE id = ?`;
        const result = await knex.raw(query, [userId]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid email');
        }

        return user;
    }

    async login(email: string, password: string): Promise<User | undefined> {
        const query = `SELECT * FROM users WHERE email = ?`;
        const result = await knex.raw(query, [email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return user;
    }
};

export default new UserModel();