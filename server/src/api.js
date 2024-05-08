const express = require("express")
const Users = require("./entities/users.js")

function init() {
  const router = express.Router()
  router.use(express.json())

  router.use((req, res, next) => {
    console.log("API: method %s, path %s", req.method, req.path)
    console.log("Body", req.body)
    next()
  })
  const users = new Users.default()
  router.post("/user/login", async (req, res) => {
    try {
      const { login, password } = req.body
      // HTTP request error
      if (!login || !password) {
        res.status(400).json({
          status: 400,
          message: "Invalid Request : login and password necessary",
        })
        return
      }
      if (!(await users.exists(login))) {
        res.status(401).json({
          status: 401,
          message: "Uknown user",
        })
        return
      }
      let userid = await users.checkpassword(login, password)
      if (userid) {
        // With middleware express-session
        req.session.regenerate(function (err) {
          if (err) {
            res.status(500).json({
              status: 500,
              message: "Intern Error",
            })
          } else {
            // New session created
            req.session.userid = userid
            res.status(200).json({
              status: 200,
              message: "Login and password accepted",
              session_cookie: req.session.cookie
            })
          }
        })
        return
      }
      // Fake Login
      req.session.destroy((err) => {})
      res.status(403).json({
        status: 403,
        message: "login and/or password incorrect",
      })
      return
    } catch (e) {
      // Every other errors
      res.status(500).json({
        status: 500,
        message: "Intern Error",
        details: (e || "Uknown error").toString(),
      })
    }
  })

  router
    .route("/user/:user_id(\\d+)")
    .get(async (req, res) => {
      try {
        const user = await users.get(req.params.user_id)
        if (!user) res.sendStatus(404)
        else res.send(user)
      } catch (e) {
        res.status(500).send(e)
      }
    })
    .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`))

  router.put("/user", (req, res) => {
    const { login, password, lastname, firstname } = req.body
    if (!login || !password || !lastname || !firstname) {
      res.status(400).send("Missing fields")
    } else {
      users
        .create(login, password, lastname, firstname)
        .then((user_id) => res.status(201).send({ id: user_id }))
        .catch((err) => res.status(500).send(err))
    }
  })

  return router
}
exports.default = init
