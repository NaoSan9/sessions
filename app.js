
const express = require("express");
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);
const path = require("path");
const port = 5020;
const app = express();

app.use(express.json());

app.use(Session({
    store: new FileStore({
        path: path.join(__dirname, '/tmp'),
        encrypt: true
    }),
    secret: 'Super Secret !',
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
    maxAge: 3600000
}));

app.get('/session-in', (req, res) => {
    req.session.song = "be bop a lula";
    res.send("Song is playing");
});

app.get('/session-out', (req, res) => {
    console.log(req.session.song);
});

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});