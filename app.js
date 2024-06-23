const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'tpl', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Error al leer el archivo');
            return;
        }

        res.send(data);
    });
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('User not found')
    res.json(user)
})

app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.name = req.body.name;
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.status(204).send();
});
app.listen(3000, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${port}/`)
})