import { init } from './helpers/express.helper.mjs';
import { initDatabase, createUsersTable, seedUsers, createUser, getUsers } from './helpers/db.helper.mjs';

const port = 3000;
const app = init();
const conn = initDatabase();

app.get('/', (req, res) => {
    getUsers(conn, res);
});

app.post('/seed', (req, res) => {
    seedUsers(conn, res);
});

app.post('/add-user', async (req, res) => {
    createUser(conn, req, res);
});

app.listen(port, () => {
    createUsersTable(conn);
    console.log(`App listening on port ${port}`);
});