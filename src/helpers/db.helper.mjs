import { faker } from '@faker-js/faker';
import { createPool } from 'mysql2';

export function initDatabase() {
    return createPool({
        host: 'db',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_ROOT_PASSWORD
    }).promise();
}

export function createUsersTable(connection) {
    return connection.query(`CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )`);
}

export async function getUsers(connection, res) {
    try {
        const [users] = await connection.query('SELECT * FROM users');
        res.render('home', { title: 'SQL Injection', users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.render('home', { title: 'SQL Injection', users: [] });
    }
}

export function seedUsers(connection, res) {
    const users = Array.from({ length: 10 }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email()
    }));

    connection.query('INSERT INTO users (name, email) VALUES ?', [users.map(user => [user.name, user.email])])
        .then(() => {
            console.log('Users seeded successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error seeding users:', err);
            res.redirect('/');
        });
}

export async function createUser(connection, req, res) {
    const { name, email } = req.body;

    try {
        await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding user:', err);
        res.redirect('/');
    }
}