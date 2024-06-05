import express from 'express';
import cors from 'cors';
import sqlite3 from 'better-sqlite3';

const app = express();
app.use(express.json());
const port = 3000;
app.use(cors({ origin: '*' }));

const db = new sqlite3("./server/data.db");



// REDIGER, SLETT OG LEGG TIL KODE HER
app.post('/login', async (req, res) => {
    let query = `
        SELECT id, username, role 
        FROM users 
        WHERE username = (?) AND password = (?)
    `;

    const data = db.prepare(query).get(req.body.username, req.body.password);

    if (data) {
        res.send(data);
    } else {
        res.status(401).send("Invalid credentials");
    }
});

app.post('/signup', (req, res) => {
    let query = `
        INSERT INTO users (username, password, role)
        VALUES (?, ?, ?)
    `;

    const data = db.prepare(query).run(req.body.username, req.body.password, req.body.role);

    res.send(data);
});

app.post('/groups', (req, res) => {
    let query = `
        INSERT INTO typeOfRoof (type)
        VALUES (?)
    `;

    const data = db.prepare(query).run(req.body.type);

    res.send(data);
});

app.put('/groups', (req, res) => {
    let query = `
        UPDATE typeOfRoof
        SET type = (?)
        WHERE id = (?)
    `;

    const data = db.prepare(query).run(req.body.type, req.body.id);

    res.send(data);
});

app.delete('/groups/:id', (req, res) => {
    let query = `
        DELETE FROM typeOfRoof
        WHERE id = (?)
    `;

    const data = db.prepare(query).run(req.params.id);

    res.send(data);
});

app.post('/solutions', (req, res) => {
    let query = `
        INSERT INTO solutions (title, text, img, id_group)
        VALUES (?, ?, ?, ?)
    `;

    const data = db.prepare(query).run(req.body.title, req.body.text, req.body.img, req.body.id_group);

    res.send(data);
});

app.put('/solutions', (req, res) => {
    let query = `
        UPDATE solutions
        SET title = (?), text = (?), img = (?), id_group = (?)
        WHERE id = (?)
    `;

    const data = db.prepare(query).run(req.body.title, req.body.text, req.body.img, req.body.id_group, req.body.id);

    res.send(data);
});

app.put('/solutions/views', (req, res) => {
    let query = `
        UPDATE solutions
        SET views = views + 1
        WHERE id = (?)
    `;

    const data = db.prepare(query).run(req.body.id);

    res.send(data);
});

app.delete('/solutions/:id', (req, res) => {
    let query = `
        DELETE FROM solutions
        WHERE id = (?)
    `;

    const data = db.prepare(query).run(req.params.id);

    res.send(data);
});


// API
app.get('/solutions', (req, res) => {
    let query = `
        SELECT s.id, s.title, s.text, s.img, s.id_group, s.views, t.type 
        FROM solutions s
        INNER JOIN typeOfRoof t ON s.id_group = t.id
    `;

    const data = db.prepare(query).all();

    res.send(data);
});

app.get('/solution/:id', (req, res) => {
    let query = `
        SELECT s.id, s.title, s.text, s.img, s.id_group, t.type 
        FROM solutions s
        INNER JOIN typeOfRoof t ON s.id_group = t.id
        WHERE s.id_group = (?)
    `;

    const data = db.prepare(query).all(req.params.id);

    res.send(data);
});

app.get('/groups', (req, res) => {
    let query = `
        SELECT id, type 
        FROM typeOfRoof
    `;

    const data = db.prepare(query).all();

    res.send(data);
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});