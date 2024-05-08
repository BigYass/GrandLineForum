const { MongoClient } = require('mongodb')
const db = require('../db')



class Users {
  
  constructor() {
    this.collection_name = "users"
    this.collection = db.db.collection(this.collection_name)
  }

  /**
   * Create a user if login doesn't exist and return the userid
   * @param {String} login Unique login
   * @param {String} password Password
   * @param {String} lastname Last Name
   * @param {String} firstname First Name
   * @returns {Promise<number>} A Promise of the userid of the user created
   */
  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      const query = {login: login}
      const options = {}

      const user = this.collection.find(query, options)
        
      if(user){
        reject("Login " + login + " already exists")
      }
      else {
        const user = {
          login: login,
          password: password,
          lastname: lastname,
          password: password,
        }

        console.log("Creating : " + login)

        this.collection.insertOne(user)
      }
    })
  }

  /**
   * Get the user with his userid
   * @param {number} userid 
   * @returns The user 
   */
  get(userid) {
    return new Promise((resolve, reject) => {
      // Search for the user in the db
      const query = {id : userid}
      const options = {}

      this.collection.find(query, options)
        .then((user) => resolve(user))
        .catch(() => resolve())
    })
  }

  /**
   * Search if a login is associated to a user
   * @param {String} login Login
   * @returns True if exist
   */
  async exists(login) {
    return new Promise((resolve, reject) => {
      const query = {login: login}
      const options = {}

      this.collection.find(query, options)
        .then((_) => resolve(true))
        .catch((err) => reject(err))
    })
  }

  /**
   * Check for the presence of a user, check password and gives his id if found
   * @param {String} login 
   * @param {String} password 
   * @returns A Promise of the userid of the login and password combination if found
   */
  async checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      const query = {login: login, password: password}
      const options = {projection: {id: 1}}

      const founds = this.collection.find(query, options)
    })
  }

}

exports.default = Users

