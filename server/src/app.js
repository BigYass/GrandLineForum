import { normalize, dirname } from 'path'
import db from './db.js'
import api from './api.js'
import config from './conf.js'
import express from 'express'


// Base directory
const basedir = normalize(dirname(new URL(import.meta.url).pathname));
console.debug(`Base directory: ${basedir}`)

// Initialize express and express-session
const app = express()
import session from "express-session"

app.use(session({
    secret: "ota ass knee",
    resave: true,
    saveUninitialized: false
}))


app.use('/api', api())

// Start the server
app.on('close', () => {
})

export default app



