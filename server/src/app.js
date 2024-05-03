const path = require('path')
const api = require('./api.js')

const config = require('./conf.js')

const { MongoClient } = require("mongodb")


// Base directory
const basedir = path.normalize(path.dirname(__dirname))
console.debug(`Base directory: ${basedir}`)

// Initialize express and express-session
express = require('express')
const app = express()
const session = require("express-session")

app.use(session({
    secret: "ota ass knee",
    resave: true,
    saveUninitialized: false
}))

app.use('/api', api.default())

// Initiliaze mongodb
const client = new MongoClient(config.database_url)


// Start the server
app.on('close', () => {
})
exports.default = app

