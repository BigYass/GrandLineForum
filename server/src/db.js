const { MongoClient } = require("mongodb")

const config = require('./conf.js')

module.exports = {
  db : new MongoClient(config.database_url).db(config.database_name),
}