// const http = require('http');

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2022-1-17T17:30:31.098Z',
        important: true,
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        date: '2022-1-17T18:39:34.091Z',
        important: false,
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2022-1-17T19:20:14.298Z',
        important: true,
    },
    {
        id: 4,
        content: 'POST is used to add data to a REST api',
        date: '2022-06-18T05:48:16.088Z',
        important: false,
    },
];

// const { application } = require('express');
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end(JSON.stringify(notes));
// });

// const PORT = 3002;
// app.listen(PORT);

// console.log(`🚀 server running at port ${PORT}`);

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'))


app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find((note) => note.id === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter((note) => note.id !== id);

    res.status(204).end();
});

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
};

app.post('/api/notes', (req, res) => {
    const body = req.body;

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing',
        });
    }

    const note = {
        content: body.content,
        important: body.importat || false,
        date: new Date(),
        id: generateId(),
    };

    notes = notes.concat(note);

    res.json(note);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 server running at port ${PORT}`);
});
