import { Knex } from "knex";
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
  await knex('users').del();

  // Insert a default user
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('testing', saltRounds);

  await knex('users').insert([
    { name: 'testing', email: 'testing@test.com', password: hashedPassword }
  ]);
};
