import { MongoClient } from "mongodb";
import config from './conf.js';

const client = new MongoClient(config.database_url)
let conn;

console.log("Connecting to database " + config.database_url)

console.log("Connected to the database")

try {
  conn = await client.connect()
} catch(err) {
  console.error("Error connecting to the database : " + err)
}

let db = conn.db(config.database_name);
console.log("Connected to database " + config.database_url)

export default db