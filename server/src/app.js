const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
const session = require("express-session");

app.use(session({
    secret: "ota ass knee",
    resave: true,
    saveUninitialized: false
}));

app.use('/api', api.default());

// Start the server
app.on('close', () => {
});
exports.default = app;

