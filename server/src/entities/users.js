class Users {
  
  /**
   * 
   * @param {import('mongodb').Db} db 
   */
  constructor(db) {
    this.collection_name = "users"

    this.collection = db.collection(this.collection_name)
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
    return new Promise(async (resolve, reject) => {
      const query = {login: login}
      const options = {}

      const users = await this.collection.find(query, options).toArray()
        
      if(users.length > 0){
        reject("Login " + login + " already exists")
      }
      else {
        const user = {
          id : users.length() + 1,
          login: login,
          password: password,
          lastname: lastname,
          password: password,
        }

        console.log("Creating : " + login)

        this.collection.insertOne(user)
          .then((value) => {
            resolve(value.insertedId)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }

  /**
   * Get the user with his userid
   * @param {number} userid 
   * @returns The user 
   */
  get(userid) {
    return new Promise(async (resolve, reject) => {
      // Search for the user in the db
      const query = {_id : userid}
      const options = {projection : {password : 0}}

      const users = await this.collection.find(query, options).toArray()

      if(users.length < 1){
        reject("Not found")
      } else if (users.length > 1) {
        reject("Two or more users found")
      } else {
        resolve(users[0])
      }
    })
  }

  /**
   * Search if a login is associated to a user
   * @param {String} login Login
   * @returns True if exist
   */
  async exists(login) {
    return new Promise(async (resolve, reject) => {
      const query = {login: login}
      const options = {}

      const found = await this.collection.find(query, options)
        .toArray()

      resolve(found.length() > 0)
    })
  }

  /**
   * Check for the presence of a user, check password and gives his id if found
   * @param {String} login 
   * @param {String} password 
   * @returns A Promise of the userid of the login and password combination if found
   */
  async checkpassword(login, password) {
    return new Promise(async (resolve, reject) => {
      const query = {login: login, password: password}
      const options = {projection: {id: 1}}

      const found = await this.collection.find(query, options).toArray()

      resolve(found.length > 0)
    })
  }
}

export default Users

